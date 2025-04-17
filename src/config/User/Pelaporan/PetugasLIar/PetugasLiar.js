import axios from "axios";
import Cookies from "js-cookie";
import { cookieApiClientGet, cookieApiClientPost } from "../../../axios-config";
import { GetItem } from "../../../SetItem";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function AddDataPetugas(data) {
  console.log("Payload:", data);
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClientPost.post("/petugas", data, {
      headers: {
        Authorization: `Bearer ${Tokens}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Gagal menambahkan data:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function GetDataPetugas(idPengguna) {
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClientGet.get(`/petugas/${idPengguna}`, {
      headers: {
        Authorization: `Bearer ${Tokens}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching parkir data:", error);
    throw error;
  }
}

async function UpdateDataPetugas() {}

async function GetDetailPetugas(id) {
  const { Tokens } = await GetItem();

  try {
    const response = await cookieApiClientGet.get(`/petugas/detail/${id}`, {
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
}

async function GetDataPetugasMaps(idPengguna) {
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClientGet.get(`/petugas/${idPengguna}`, {
      headers: {
        Authorization: `Bearer ${Tokens}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching parkir data:", error);
    throw error;
  }
}

export {
  GetDataPetugas,
  GetDataPetugasMaps,
  GetDetailPetugas,
  UpdateDataPetugas,
  AddDataPetugas,
};
