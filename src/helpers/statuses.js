export const statuses = [
  'to_do',
  'application_in_progress',
  'interview_in_progress',
  'contract_finalization',
  'contract_signed',
  'refusal',
];

export const statusNames = {
  to_do: 'À faire',
  application_in_progress: 'Candidature envoyée',
  interview_in_progress: 'Entretien en cours',
  contract_finalization: 'Finalisation du contrat',
  contract_signed: 'Contrat signé',
  refusal: 'Refus',
};

export const getItemsByStatus = (unorderedItems) => {
  const itemsByStatus = unorderedItems.reduce(
    (acc, item) => {
      acc[item.status].push(item);
      return acc;
    },
    statuses.reduce((obj, status) => ({ ...obj, [status]: [] }), {})
  );
  // order each column by index
  statuses.forEach((status) => {
    itemsByStatus[status] = itemsByStatus[status].sort(
      (recordA, recordB) => recordA.index - recordB.index
    );
  });
  return itemsByStatus;
};
