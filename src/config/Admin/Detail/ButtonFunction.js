import cookieApiClient from "../../axios-config";
import { GetItem } from "../../SetItem";

// Parkir
const ApproveParkir = async (id, data) => {
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClient.put(`/adminparkir/${id}`, data, {
      headers: {
        Authorization: `Bearer ${Tokens}`,
      },
    });
    console.log("Response Data", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Gagal Fetching Data:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const RejectParkir = async (id, data) => {
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClient.put(`/adminparkir/${id}`, data, {
      headers: {
        Authorization: `Bearer ${Tokens}`,
      },
    });
    console.log("Response Data", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Gagal Fetching Data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Petugas

const ApprovePetugas = async (id, data) => {
  const { Tokens } = await GetItem();
  console.log(Tokens);
  try {
    const response = await cookieApiClient.put(`/adminpetugas/${id}`, data, {
      headers: {
        Authorization: `Bearer ${Tokens}`,
      },
    });
    console.log("Response Data", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Gagal Fetching Data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const RejectPetugas = async (id, data) => {
  const { Tokens } = await GetItem();
  console.log(Tokens);
  try {
    const response = await cookieApiClient.put(`/adminpetugas/${id}`, data, {
      headers: {
        Authorization: `Bearer ${Tokens}`,
      },
    });
    console.log("Response Data", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Gagal Fetching Data:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export { ApproveParkir, RejectParkir, RejectPetugas, ApprovePetugas };
