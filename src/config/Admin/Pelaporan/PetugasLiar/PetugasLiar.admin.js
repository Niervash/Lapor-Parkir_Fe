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
export { GetDataPetugas, DeleteLaporanPetugas, GetDetailPetugas };
