const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'hackateam',
  user: 'postgre',
  password: 'postgre',
});

client.connect();

function camelToSnake(string) {
  return string
    .replace(/[\w]([A-Z])/g, function (m) {
      return m[0] + '_' + m[1];
    })
    .toLowerCase();
}

function snakeToCamel(string) {
  return string.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
}

const getUser = async (token) => {
  let user;

  try {
    user = JSON.parse(atob(token));
  } catch (e) {
    console.log('token invalide', e);
    return;
  }

  if (!user.id) {
    console.log('token invalide');
    return;
  }

  const userDb = (
    await client.query('SELECT * from users WHERE id_oc = $1', [user.id])
  ).rows[0];

  if (!userDb) {
    await client.query(
      'INSERT INTO users (id_oc, firstname, lastname, email) VALUES ($1, $2, $3, $4)',
      [user.id, user.firstname, user.lastname, user.email]
    );
    await client.query('INSERT INTO checklist (id_oc) VALUES ($1)', [user.id]);
  }

  return user.id;
};

const getChecklist = async ({ token }) => {
  const id = await getUser(token);
  return (await client.query('SELECT * from checklist WHERE id_oc = $1', [id]))
    .rows[0];
};

const updateChecklist = async ({ token, questions }) => {
  const id = await getUser(token);
  const updates = [];
  const values = [id];

  Object.keys(questions).forEach((question, index) => {
    if (
      ['question_1', 'question_2', 'question_3', 'question_4'].includes(
        question
      )
    ) {
      updates.push(`${question} = $${index + 2}`);
      values.push(questions[question]);
    }
  });

  if (updates.length === 0) {
    return;
  }

  const query = `UPDATE checklist SET ${updates.join(', ')} WHERE id_oc = $1`;
  return await client.query(query, values);
};

const getApplications = async ({ token }) => {
  const id = await getUser(token);
  return (
    await client.query('SELECT * FROM applications WHERE oc_id = $1', [id])
  ).rows.map((row) => {
    const application = {};
    Object.keys(row).forEach((key) => {
      application[snakeToCamel(key)] = row[key];
    });
    return application;
  });
};

const createApplication = async ({ token, application }) => {
  const userId = await getUser(token);

  const query = `
    INSERT INTO applications (
      oc_id, 
      status, 
      job_title, 
      company_name, 
      company_website_link, 
      link_offer, 
      job_source, 
      town_name, 
      remote_preference, 
      contract_type, 
      motivation_letter, 
      content, 
      contact_name, 
      contact_position, 
      contact_email, 
      contact_telephone, 
      contact_linkedin_url, 
      action_write_letter, 
      action_fill_application, 
      action_remind_contact, 
      action_gather_company_info, 
      action_stalk_contact, 
      action_send_thanks_mail, 
      action_fill_employer_dashboard,
      action_find_good_contact,
      action_next_interview_date,
      action_remind_interview
    ) VALUES (
      $1, 
      $2, 
      $3, 
      $4, 
      $5, 
      $6, 
      $7, 
      $8, 
      $9, 
      $10, 
      $11, 
      $12, 
      $13, 
      $14, 
      $15, 
      $16, 
      $17, 
      $18, 
      $19, 
      $20, 
      $21, 
      $22, 
      $23, 
      $24,
      $25,
      $26,
      $27
    )`;

  const values = [
    userId,
    application.status,
    application.jobTitle,
    application.companyName,
    application.companyWebsiteLink,
    application.linkOffer,
    application.jobSource,
    application.townName,
    application.remotePreference,
    application.contractType,
    application.motivationLetter,
    application.content,
    application.contactName,
    application.contactPosition,
    application.contactEmail,
    application.contactTelephone,
    application.contactLinkedinUrl,
    application.actionWriteLetter,
    application.actionFillApplication,
    application.actionRemindContact,
    application.actionGatherCompanyInfo,
    application.actionStalkContact,
    application.actionSendThanksMail,
    application.actionFillEmployerDashboard,
    application.actionFindGoodContact,
    application.actionNextInterviewDate,
    application.actionRemindInterview,
  ];

  await client.query(query, values);
};

const updateApplication = async ({ token, application, applicationId }) => {
  const id = await getUser(token);
  let query = 'UPDATE applications SET ';
  const keys = Object.keys(application);
  const values = [];

  keys.forEach((key, index) => {
    query += `${camelToSnake(key)} = $${index + 1}, `;
    values.push(application[key]);
  });

  if (application.status) {
    createAction({
      token,
      action: {
        action_type: 'update_status',
        applicationId,
        var1: application.status,
      },
    });
  }

  query = query.slice(0, -2);
  query += ' WHERE id = ' + applicationId;

  await client.query(query, values);
};

const createAction = async ({ token, action }) => {
  const user_id = await getUser(token);
  const query =
    'INSERT INTO actions (oc_id, action_type, application_id, var1, var2, var3) VALUES ($1, $2, $3, $4, $5, $6)';

  const values = [
    user_id,
    action.action_type,
    action.applicationId,
    action.var1,
    action.var2,
    action.var3,
  ];

  return await client.query(query, values);
};

const getAnalytics = async () => {
  return (await client.query('SELECT * from users')).rows;
};

module.exports = {
  updateChecklist,
  getChecklist,
  getApplications,
  updateApplication,
  createApplication,
  createAction,
  getAnalytics,
};
