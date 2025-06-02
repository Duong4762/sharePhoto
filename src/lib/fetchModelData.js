/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
async function fetchModel(url) {
  try {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await fetch(`https://wpzplg-8081.csb.app${url}`, {
      headers,
    });
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
