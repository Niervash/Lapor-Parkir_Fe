import axios from "axios";
import Cookies from "js-cookie";
import { cookieApiClientGet, cookieApiClientPost } from "../../../axios-config";
import { GetItem } from "../../../SetItem";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function AddDataParkir(data) {
  console.log("Payload:", data);
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClientPost.post("/parkir", data, {
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

const getAlldataParkir = async (Id_Pengguna) => {
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClientGet.get(`/parkir/${Id_Pengguna}`, {
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

async function UpdateDataParkirLiar() {}

async function GetDetailParkir(id) {
  const { Tokens } = await GetItem();

  try {
    const response = await cookieApiClientGet.get(`/parkir/detail/${id}`, {
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

const getAlldataParkirMaps = async (idPengguna) => {
  const { Tokens } = await GetItem();
  try {
    const response = await cookieApiClientGet.get(`/parkir/${idPengguna}`, {
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

export {
  GetDetailParkir,
  getAlldataParkir,
  UpdateDataParkirLiar,
  AddDataParkir,
  getAlldataParkirMaps,
};
