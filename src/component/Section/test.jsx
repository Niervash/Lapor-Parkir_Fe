import React, { useState } from "react";
import logo from "../../../public/Logo/1.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Islogin } from "../../config/Auth/Auth";

const DataDisplay = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State untuk menyimpan pesan error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error, data } = await Islogin({ email, password });

    if (!error) {
      toast.success("Login berhasil!");
      setIsLoading(false);
      navigate("/"); // Redirect ke halaman setelah login berhasil
    } else {
      setIsLoading(false);
      // Tampilkan pesan error ke pengguna
      toast.error(data || "Login gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
      <ToastContainer /> {/* Notifikasi */}
      <main className="mt-0 transition-all duration-200 ease-in-out p-1">
        <section>
          <div className="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
            <div className="container z-1">
              <div className="flex flex-wrap -mx-3">
                {/* Input Sign In */}
                <div className="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-32 shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12 rounded-lg p-5 shadow-md">
                  <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 lg:py4 rounded-2xl bg-clip-border">
                    <div className="flex items-center justify-center bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')] rounded-2xl p-4 mr-5 ml-5 shadow-xl">
                      <img src={logo} alt="Logo" className="w-[60px] h-auto" />
                      <span className="ml-2 self-center text-white text-2xl font-semibold whitespace-nowrap">
                        Lapor <span className="text-sky-300">Parkir</span>
                      </span>
                    </div>
                    <div className="p-6 pb-0 mb-0">
                      <h4 className="font-bold text-2xl text-gray-500">
                        Sign In
                      </h4>
                      <p className="mb-0">
                        Enter your email and password to sign in
                      </p>
                    </div>
                    <div className="flex-auto p-6">
                      {/* Tampilkan pesan error jika ada */}
                      {errorMessage && (
                        <div className="mb-4 p-3 text-sm text-red-600 bg-red-100 rounded-lg">
                          {errorMessage}
                        </div>
                      )}
                      <form role="form" onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            required
                          />
                        </div>
                        <div className="flex items-center pl-12 mb-0.5 text-left min-h-6">
                          <input
                            id="rememberMe"
                            className="mt-0.5 rounded-10 duration-250 ease-in-out after:rounded-circle after:shadow-2xl after:duration-250 checked:after:translate-x-5.3 h-5 relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-zinc-700/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-blue-500/95 checked:bg-blue-500/95 checked:bg-none checked:bg-right"
                            type="checkbox"
                          />
                          <label
                            className="ml-2 font-normal cursor-pointer select-none text-sm text-slate-700"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="inline-block w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all bg-blue-500 border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25"
                            disabled={isLoading}
                          >
                            {isLoading ? "Loading..." : "Sign In"}
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 text-center pt-0 px-1 sm:px-6">
                      <p className="mx-auto mb-6 leading-normal text-sm">
                        Don't have an account?{" "}
                        <Link
                          to="/register"
                          className="font-semibold text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500"
                        >
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                {/* Gambar Latar Belakang (Sembunyikan di Mobile) */}
                <div className="absolute top-0 right-0 flex-col justify-center hidden w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center lg:flex">
                  <div className="relative flex flex-col justify-center h-full bg-cover px-24 m-4 overflow-hidden bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')] rounded-xl">
                    <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-blue-500 to-violet-500 opacity-60"></span>
                    <h4 className="z-20 mt-12 font-bold text-white text-2xl">
                      "Attention is the new currency"
                    </h4>
                    <p className="z-20 text-white">
                      The more effortless the writing looks, the more effort the
                      writer actually put into the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="py-12"></footer>
      </main>
    </div>
  );
};

export default DataDisplay;
