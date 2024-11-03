import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastNotif } from "../../../bases/Toast/ToastNotif";
import { Islogin } from "../../../../config/network-data";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error, data } = await Islogin({ email, password });

    if (!error) {
      setToastMessage("Login berhasil!");
      setToastType("success");
      setShowToast(true);
      setIsLoading(false);
      navigate("/"); // Ubah sesuai dengan rute setelah login
    } else {
      // Pastikan data adalah string untuk ditampilkan di toast
      setToastMessage(
        typeof data === "string" ? data : "Login gagal. Silakan coba lagi."
      );
      setToastType("error");
      setShowToast(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-600 py-5">
      <div className="container flex flex-col mx-auto bg-slate-600 pt-12 my-5 max-w-md">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-slate-600 rounded-3xl"
                onSubmit={handleSubmit}
              >
                <h3 className="mb-3 text-4xl font-extrabold text-white">
                  Sign In
                </h3>
                <p className="mb-4 text-gray-400">
                  Enter your email and password
                </p>

                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-white"
                >
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@etc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex items-center w-full px-5 py-4 mr-2 drop-shadow-lg text-sm font-medium outline-none focus:bg-grey-800 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-800 rounded-2xl"
                  required
                />
                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-white"
                >
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm drop-shadow-lg font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  required
                />

                <button
                  type="submit"
                  className="w-full drop-shadow-2xl px-6 py-5 mb-5 mt-4 text-sm font-bold leading-none text-gray-900 transition duration-300 md:w-96 rounded-2xl hover:bg-slate-gray-600 hover:bg-gray-100 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </button>
                <p className="text-sm leading-relaxed text-white">
                  Belum Punya Akun?
                  <Link to="/Register" className="font-bold text-gray-800 ml-1">
                    Daftar Di Sini
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        {showToast && (
          <ToastNotif
            message={toastMessage}
            type={toastType}
            onClose={handleCloseToast}
          />
        )}
      </div>
    </div>
  );
};
