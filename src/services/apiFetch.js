export default function apiFetch(url, options) {
  const baseUrl = process.env.REACT_APP_API_URL;
  const finalUrl = baseUrl ? `${baseUrl}/api/${url}` : url;

  return fetch(finalUrl, options)
    .then((response) => response)
    .catch((error) => {
      console.error("Erreur lors de la requête API:", error);
      throw error;
    });
}
