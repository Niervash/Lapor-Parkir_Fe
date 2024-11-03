import cookieApiClient from "./axios-config";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function StatsFetch({ email, password }) {
  try {
    const response = await cookieApiClient.get(`${BASE_URL}/dashboard`);
    if (result) {
      setData(result); // Set data dari API
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Auth Sections
async function Islogin({ email, password }) {
  try {
    const response = await cookieApiClient.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    // Simpan data login di sessionStorage
    sessionStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("user", JSON.stringify(response.data));

    return { data: response.data };
  } catch (error) {
    return { error: true, data: error.response.data.msg };
  }
}

async function GetUserLoged() {
  try {
    const response = await cookieApiClient.get(`${BASE_URL}/me`);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: error.response.data.msg };
  }
}

async function IsLogout() {
  try {
    const response = await cookieApiClient.delete(`${BASE_URL}/logout`);
    window.location.href = "/";
    return response.data.msg;
  } catch (error) {
    return error;
  }
}

async function IsRegister(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/user`, formData);
    return { data: response.data };
  } catch (error) {
    throw { error: true };
  }
}

// Petugas Sections

// Petugas Liar
async function addDataPetugas(data) {
  try {
    const response = await cookieApiClient.post(`${BASE_URL}/petugas/`, data);
    console.log("Data berhasil ditambahkan:", response.data);
    return response.data;
  } catch (error) {
    console.error("Gagal menambahkan data:", error);
    throw error;
  }
}

async function getAlldataPetugas(userId) {
  try {
    const response = await cookieApiClient.get(`${BASE_URL}/petugas/${userId}`);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Lempar kembali error agar dapat ditangani di tempat lain
  }
}

async function UpdateDataPetugas() {}

async function getDatabyIdPetugas() {}

// Parkir liar
async function addDataParkir(data) {
  try {
    const response = await cookieApiClient.post(`${BASE_URL}/parkir/`, data);
    console.log("Data berhasil ditambahkan:", response.data);
    return response.data;
  } catch (error) {
    console.error("Gagal menambahkan data:", error);
    throw error;
  }
}

// Landing Page

async function getDataDashboard() {
  try {
    const response = await cookieApiClient.get(`${BASE_URL}/dashboard`);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Lempar kembali error agar dapat ditangani di tempat lain
  }
}

async function getAlldataParkir(userId) {
  try {
    const response = await cookieApiClient.get(`${BASE_URL}/parkir/${userId}`);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Lempar kembali error agar dapat ditangani di tempat lain
  }
}

export {
  Islogin,
  IsRegister,
  IsLogout,
  addDataPetugas,
  getAlldataPetugas,
  getDataDashboard,
  getAlldataParkir,
  StatsFetch,
};
