const express = require('express');
const path = require('path');
const repository = require('./repository');
const cors = require('cors');

const LISTENING_PORT = process.env.LISTENING_PORT || 8080;
const LISTENING_ADDRESS = process.env.LISTENING_ADDRESS || 'localhost';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../build')));

app.get('/api/checklists', async (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.status(400).send('Missing token');
    return;
  }

  const row = await repository.getChecklist({
    token,
  });

  res.send({
    question1: row.question_1,
    question2: row.question_2,
    question3: row.question_3,
    question4: row.question_4,
  });
});

app.post('/api/checklists', async (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.status(400).send('Missing token');
    return;
  }

  await repository.updateChecklist({
    token,
    questions: req.body,
  });

  res.send('OK');
});

app.get('/api/applications', async (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.status(400).send('Missing token');
    return;
  }

  const rows = await repository.getApplications({
    token,
  });

  res.send(rows);
});

app.get('/api/team', async (req, res) => {
  const token = req.query.token;
  if (token !== 'hackateam') {
    res.status(400).send('Incorrect password');
    return;
  }

  const rows = await repository.getAnalytics();

  res.send(rows);
});

app.post('/api/applications', async (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.status(400).send('Missing token');
    return;
  }

  await repository.createApplication({
    token,
    application: req.body,
  });

  res.send('OK');
});

app.patch('/api/applications/:id', async (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.status(400).send('Missing token');
    return;
  }

  await repository.updateApplication({
    token,
    application: req.body,
    applicationId: req.params.id,
  });

  res.send('OK');
});

app.listen(LISTENING_PORT, LISTENING_ADDRESS, () => {
  console.log(`Running on http://${LISTENING_ADDRESS}:${LISTENING_PORT}`);
});
