import cookieApiClient, { cookieApiClientGet } from "../../../axios-config";
import { GetItem } from "../../../SetItem";

const GetDataParkir = async () => {
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClient.get(`/adminparkir`, {
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

const AdminGetDetailParkir = async (id) => {
  const { Tokens } = await GetItem();

  try {
    const response = await cookieApiClientGet.get(`/adminparkir/detail/${id}`, {
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

const DeleteLaporanParkir = async (id) => {
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClient.delete(`/adminparkir/${id}`, {
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

const UpdateLaporanParkir = async (id) => {
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClient.put(`/adminparkir/${id}`, {
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

const ApproveParkir = async () => {};
const RejectParkir = async () => {};
export {
  GetDataParkir,
  DeleteLaporanParkir,
  AdminGetDetailParkir,
  UpdateLaporanParkir,
};
