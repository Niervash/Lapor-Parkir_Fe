import React, { useState } from "react";
import { toast } from "sonner";
import { IsRegister } from "../../../../config/Auth/Auth";

export const RegisterForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Pria");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [role] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", name);
    formData.append("email", email);
    formData.append("jenis_kelamin", gender);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("role", role);

    if (profilePicture) {
      formData.append("foto_profil", profilePicture);
    }

    const { error, data } = await IsRegister(formData);

    if (!error) {
      toast.success("Registration successful!");
      window.location.href = "/login";
    } else {
      toast.error(data || "Registration failed!");
    }
  };

  return (
    <div className="bg-slate-600 py-5">
      <div className="container flex flex-col mx-auto bg-slate-600 pt-12 my-5 px-4 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-center w-full h-full my-auto xl:gap-14 md:gap-5">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-slate-600 rounded-3xl"
                onSubmit={handleSubmit}
              >
                <h3 className="mb-3 text-4xl font-extrabold text-white">
                  Register
                </h3>
                <p className="mb-4 text-gray-400">Create your account</p>

                <div className="flex flex-wrap mb-7 text-left">
                  <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-2">
                    <label htmlFor="nama" className="mb-2 text-sm text-white">
                      Name*
                    </label>
                    <input
                      id="nama"
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mt-2 px-5 py-4 drop-shadow-lg text-sm font-medium outline-none bg-grey-200 text-dark-grey-800 rounded-2xl"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-2">
                    <label htmlFor="email" className="mb-2 text-sm text-white">
                      Email*
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="email@etc.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full mt-2 px-5 py-4 drop-shadow-lg text-sm font-medium outline-none bg-grey-200 text-dark-grey-800 rounded-2xl"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-7 text-left">
                  <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-2">
                    <label
                      htmlFor="jenis_kelamin"
                      className="mb-2 text-sm text-white"
                    >
                      Gender*
                    </label>
                    <select
                      id="jenis_kelamin"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full mt-2 px-5 py-4 drop-shadow-lg text-gray-800 text-sm font-medium outline-none bg-grey-200 text-dark-grey-800 rounded-2xl"
                    >
                      <option value="Pria">Pria</option>
                      <option value="Wanita">Wanita</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="w-full md:w-1/2 md:pl-2">
                    <label
                      htmlFor="username"
                      className="mb-2 text-sm text-white"
                    >
                      Username*
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Your Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full mt-2 px-5 py-4 drop-shadow-lg text-sm font-medium outline-none bg-grey-200 text-dark-grey-800 rounded-2xl"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-7 text-left">
                  <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-2">
                    <label
                      htmlFor="password"
                      className="mb-2 text-sm text-white"
                    >
                      Password*
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full mt-2 px-5 py-4 drop-shadow-lg text-sm font-medium outline-none bg-grey-200 text-dark-grey-800 rounded-2xl"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-2">
                    <label
                      htmlFor="foto_profil"
                      className="mb-2 text-sm text-white"
                    >
                      Profile Picture
                    </label>
                    <input
                      id="foto_profil"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfilePicture(e.target.files[0])}
                      className="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
                      aria-describedby="file_input_help"
                    />
                    <p
                      className="mt-1 text-sm text-gray-500"
                      id="file_input_help"
                    >
                      PNG or JPG.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-5 mb-5 text-sm font-bold text-white bg-gray-800 rounded-2xl hover:bg-gray-600 transition duration-300"
                >
                  Register
                </button>
                <p className="text-sm text-white">
                  Sudah Mempunyai Akun?
                  <a href="/login" className="font-bold text-gray-800 ml-1">
                    Masuk Di Sini
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
