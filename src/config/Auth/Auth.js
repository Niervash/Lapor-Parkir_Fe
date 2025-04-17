import axios from "axios";
import Cookies from "js-cookie";
import cookieApiClient, { cookieApiClientGet } from "../axios-config";
import { GetItem, setLogin, setLogout } from "../SetItem";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function Islogin({ email, password }) {
  try {
    const payload = { email, password };
    console.log("Login Payload:", payload);

    const response = await cookieApiClient.post(`${BASE_URL}/login`, payload);
    console.log("Login Response:", response);

    if (response.data.token) {
      setLogin(response);
    }

    return {
      error: null,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Login error:",
      error.response?.data?.message || error.message
    );

    throw {
      error: true,
      message:
        error.response?.data?.message || "Login failed. Please try again.",
    };
  }
}

async function GetUserLoged() {
  const { Tokens, role } = await GetItem();

  try {
    cookieApiClientGet.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${Tokens}`;
    // Make Get Request
    const response = await cookieApiClientGet.get("/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// Register
async function IsRegister({
  nama,
  email,
  jenis_kelamin,
  username,
  password,
  foto_profil,
}) {
  try {
    const payload = {
      nama,
      email,
      jenis_kelamin,
      username,
      password,
      foto_profil,
    };

    console.log("Registration Payload:", payload);

    const response = await cookieApiClient.post(`${BASE_URL}/user`, payload);

    console.log("Registration successful:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Registration error:",
      error.response?.data?.message || error.message
    );

    throw new Error(
      `Registration failed: ${error.response?.data?.message || error.message}`
    );
  }
}

async function IsLogout() {
  try {
    s;
    setLogout(response);
    return response.data.msg;
  } catch (error) {
    return error;
  }
}

const fetchDashboardData = async () => {
  try {
    const response = await cookieApiClientGet.get(`/dashboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export { IsLogout, fetchDashboardData, IsRegister, Islogin, GetUserLoged };
