import React, { useState } from "react";
import logo from "../../../public/Logo/1.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultProfile from "../Assets/profil.jpg"; // Gambar default
import { IsRegister } from "../../config/Auth/Auth";

export const Test = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Pria");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [role] = useState("user");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("nama", name);
    formData.append("email", email);
    formData.append("jenis_kelamin", gender);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("role", role);

    // Jika pengguna tidak mengunggah gambar, gunakan gambar default
    if (profilePicture) {
      formData.append("foto_profil", profilePicture);
    } else {
      // Konversi gambar default ke Blob
      const response = await fetch(defaultProfile);
      const blob = await response.blob();
      formData.append("foto_profil", blob, "default_profile.jpg");
    }

    const { error, data } = await IsRegister(formData);

    if (!error) {
      toast.success("Registrasi berhasil! Silakan login.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000); // Redirect ke halaman login setelah 2 detik
    } else {
      toast.error(data || "Registrasi gagal. Silakan coba lagi.");
    }

    setIsLoading(false);
    console.log(formData);
  };

  return (
    <div>
      <ToastContainer /> {/* Notifikasi */}
      <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
        <main className="mt-0 transition-all duration-200 ease-in-out">
          <section className="min-h-screen">
            {/* Background Section */}
            <div className="bg-top relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-cover min-h-50-screen rounded-xl bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg')]">
              <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-zinc-800 to-zinc-700 opacity-60"></span>
              <div className="container z-10">
                <div className="flex flex-wrap justify-center -mx-3">
                  <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                    <h1 className="mt-12 mb-2 text-white text-5xl font-bold">
                      Welcome!
                    </h1>
                    <p className="text-white">
                      Use these awesome forms to login or create new account in
                      your project for free.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="container">
              <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
                <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                  <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                    <div className="p-8 -mb-7 text-center bg-white border-b-0 rounded-t-2xl text-gray-500 font-bold text-3xl">
                      <h1 className="">SIGN UP</h1>
                    </div>
                    <div className="flex-auto p-8">
                      <form role="form text-left" onSubmit={handleSubmit}>
                        {/* Input Fields */}
                        <div className="mb-4">
                          <input
                            id="nama"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-3 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            placeholder="Nama*"
                            aria-label="Nama"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-3 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            placeholder="Username*"
                            aria-label="Username"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-3 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            placeholder="Email*"
                            aria-label="Email"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-3 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            placeholder="Password*"
                            aria-label="Password"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <select
                            id="jenis_kelamin"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-3 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow mb-7"
                          >
                            <option value="Pria">Pria</option>
                            <option value="Wanita">Wanita</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          {/* Input file yang tersembunyi */}
                          <input
                            id="foto_profil"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setProfilePicture(e.target.files[0])
                            }
                            className="hidden"
                            aria-describedby="file_input_help"
                          />
                          {/* Tombol untuk memicu pemilihan file */}
                          <label
                            htmlFor="foto_profil"
                            className="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 p-2 text-center"
                          >
                            {profilePicture
                              ? "Ganti Foto Profil"
                              : "Unggah Foto Profil"}
                          </label>
                        </div>
                        {/* Preview Gambar */}
                        <div className="mb-4">
                          <img
                            src={
                              profilePicture
                                ? URL.createObjectURL(profilePicture)
                                : defaultProfile
                            }
                            alt="Preview Profil"
                            className="w-24 h-24 rounded-full mx-auto object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="inline-block w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all bg-blue-500 border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25"
                            disabled={isLoading}
                          >
                            {isLoading ? "Loading..." : "Sign up"}
                          </button>
                        </div>
                        <p className="mt-4 mb-0 leading-normal text-sm">
                          Already have an account?{" "}
                          <a href="/login" className="font-bold text-slate-700">
                            Sign in
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="py-12"></footer>
        </main>
      </div>
    </div>
  );
};
