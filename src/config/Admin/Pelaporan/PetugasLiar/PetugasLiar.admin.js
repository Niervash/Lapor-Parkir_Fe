import cookieApiClient, { cookieApiClientGet } from "../../../axios-config";
import { GetItem } from "../../../SetItem";

const GetDataPetugas = async () => {
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClient.get(`/adminpetugas`, {
      headers: {
        Authorization: `Bearer ${Tokens}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching parkir data:", error);
    throw error;
  }
};

async function GetDetailPetugas(id) {
  const { Tokens } = await GetItem();

  try {
    const response = await cookieApiClientGet.get(
      `/adminpetugas/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Tokens}`,
        },
      }
    );
    console.log("Response Data", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Gagal Fetching Data:",
      error.response?.data || error.message
    );
    throw error;
  }
}

const DeleteLaporanPetugas = async (id) => {
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClient.delete(`/adminpetugas/${id}`, {
      headers: {
        Authorization: `Bearer ${Tokens}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching parkir data:", error);
    throw error;
  }
};

const processPetugasAction = async (id, action) => {
  const { Tokens } = await GetItem();

  if (!["Approve", "Reject"].includes(action)) {
    throw new Error('Action harus berupa "Approve" atau "Reject"');
  }

  try {
    const response = await cookieApiClient.post(
      `/admin-petugas/${id}`,
      { action }, // Mengirim action dalam body request
      {
        headers: {
          Authorization: `Bearer ${Tokens}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error ${action.toLowerCase()}ing petugas:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const ApprovePetugas = async (id) => {
  return processPetugasAction(id, "Approve");
};

const RejectPetugas = async (id) => {
  return processPetugasAction(id, "Reject");
};
export {
  GetDataPetugas,
  DeleteLaporanPetugas,
  GetDetailPetugas,
  ApprovePetugas,
  RejectPetugas,
};
