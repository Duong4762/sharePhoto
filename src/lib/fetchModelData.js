/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
async function fetchModel(url) {
  try {
    const response = await fetch(`https://dnynpd-8081.csb.app${url}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchModel error:", error);
    throw error;
  }
}

export default fetchModel;
