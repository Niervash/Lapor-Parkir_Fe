import { cookieApiClientGet } from "../axios-config";

export const GetAllData = async () => {
  try {
    const response = await cookieApiClientGet.get(`/alldata`);
    return response;
  } catch (error) {
    console.error("Error fetching parkir data:", error);
    throw error;
  }
};
