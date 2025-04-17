import cookieApiClient from "./axios-config";

async function StatsFetch() {
  try {
    const response = await cookieApiClient.get(`/dashboard`, {});

    const result = response.data;
    console.log(result);
    if (result) {
      setData(result);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export { StatsFetch };
