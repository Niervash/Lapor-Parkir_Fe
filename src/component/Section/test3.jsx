import React from "react";
import { TableList } from "../bases/TableList/TableList";
import { TableParkirBeranda } from "../Fragment/Table/Tableberanda/ParkirLiar/TableParkirBeranda.jsx";
import { TablePetugasBeranda } from "../Fragment/Table/Tableberanda/PetugasLiar/TablePetugasBeranda";
import { StatsCardDashboard } from "../Fragment/statistikCard/StatsCardDashboard";
import hero from "../../../public/Logo/hero.png";
import { AiOutlineLogin } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { IoLogIn } from "react-icons/io5";
import { MapContainer, TileLayer } from "react-leaflet";

export const Test3 = () => {
  return (
    <div>
      <header class="fixed w-full z-50 shadow-lg">
        <nav class="bg-white border-gray-200 py-2.5 ">
          <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <a href="#" class="flex items-center">
              <span class="self-center text-xl font-semibold whitespace-nowrap ">
                Lapor <span className="text-blue-500 "> Parkir</span>
              </span>
            </a>
            <div class="flex items-center lg:order-2">
              <a class="text-white bg-blue-700 hover:bg-blue-600 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0  focus:outline-none ">
                Sign In
              </a>
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  class="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              class="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#home"
                    class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 "
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    href="#about"
                    class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 "
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Home */}
      <section class="bg-white " id="home">
        <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl ">
              Lapor Parkir Liar <br />
              dengan Mudah!.
            </h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
              Platform ini memudahkan Anda untuk melaporkan kasus parkir liar di
              daerah Anda. Cukup isi form yang disediakan untuk memberikan
              informasi yang diperlukan .
            </p>
            <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <a
                type="button"
                // href="https://github.com/themesberg/landwind"
                class="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 sm:w-auto hover:text-blue-700 focus:ring-4 focus:ring-gray-100 "
              >
                <CiLogin className="mr-2" /> Sign In
              </a>
              <a
                type="button"
                // href="https://www.figma.com/community/file/1125744163617429490"
                class="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
              >
                <IoLogIn className="mr-2" /> Sign Up
              </a>
            </div>
          </div>
          <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={hero} alt="hero image" />
          </div>
        </div>
      </section>

      {/* About */}
      <section class="bg-gray-50 " id="about">
        <div class="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
          <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            {/* Tmpt Maps */}
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              className="h-96 rounded-2xl shadow-md mt-16 md:mt-0 z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </MapContainer>
            <div class="text-gray-500 sm:text-lg mt-5">
              <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 ">
                Kami menangani parkir liar untuk lingkungan yang lebih baik.
              </h2>
              <p class="mb-8 font-light lg:text-xl">
                Menyederhanakan proses pelaporan parkir liar untuk memastikan
                ketertiban dan keselamatan publik. Memberdayakan warga untuk
                bertindak tanpa kompleksitas metode pelaporan tradisional.
              </p>
              <ul
                role="list"
                class="pt-8 space-y-5 border-t border-gray-200 my-7 "
              >
                <li class="flex space-x-3">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-blue-500 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-base font-medium leading-tight text-gray-900 ">
                    Laporan pelanggaran parkir real-time
                  </span>
                </li>
                <li class="flex space-x-3">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-blue-500 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-base font-medium leading-tight text-gray-900 ">
                    Template pelaporan yang mudah digunakan
                  </span>
                </li>
                <li class="flex space-x-3">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-blue-500 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-base font-medium leading-tight text-gray-900 ">
                    Pelacakan pelanggaran yang efisien
                  </span>
                </li>
                <li class="flex space-x-3">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-blue-500 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-base font-medium leading-tight text-gray-900 ">
                    Otomatisasi laporan tanpa batas
                  </span>
                </li>
                <li class="flex space-x-3">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-blue-500 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-base font-medium leading-tight text-gray-900 ">
                    Manajemen pengetahuan parkir
                  </span>
                </li>
              </ul>
              <p class="font-light lg:text-xl">
                Menyediakan pengalaman pelaporan yang cepat dan efektif untuk
                mengatasi masalah parkir liar.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section class="bg-white mt-12">
        <div class="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
          <div class="grid grid-cols-2 text-center gap-8 text-gray-500 sm:gap-12 sm:grid-cols-4 lg:grid-cols-4">
            <div class="flex items-center justify-center">
              <p href="#">ada</p>
            </div>
            <div class="flex items-center justify-center">
              <p href="#">ada</p>
            </div>
            <div class="flex items-center justify-center">
              <p href="#">ada</p>
            </div>
            <div class="flex items-center justify-center">
              <p href="#">ada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Start Report */}
      <section class="bg-whites">
        <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
          <div class="max-w-screen-sm mx-auto text-center">
            <h2 class="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 ">
              Lapor Sekarang
            </h2>
            <p class="mb-6 font-light text-gray-500 md:text-lg">
              Lapor Parkir Merupakan Platform Pelaporan Parkir Liar,
              <br /> Coba sekarang.
            </p>
            <a
              href="#"
              class="text-white bg-blue-700 hover:bg-blue-600 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
            >
              Sign In
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-50 pb-10">
        <div class="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
          <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
          <div class="text-center">
            <a
              href="#home"
              class="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 "
            >
              <img src="./images/logo.svg" className="h-6 mr-3 sm:h-9" />
              <span className="text-black text-xl font-bold">lapor</span>{" "}
              <span className="text-blue-500 ml-1 text-xl font-bold">
                {" "}
                Parkir
              </span>
            </a>
            <span class="block text-sm text-center text-gray-500 ">
              © 2024 Lapor Parkir™. All Rights Reserved. Built with{" "}
              <a
                href="https://react.dev/"
                class="text-blue-600 hover:underline "
              >
                React{" "}
              </a>{" "}
              and{" "}
              <a
                href="https://tailwindcss.com"
                class="text-blue-600 hover:underline "
              >
                Tailwind CSS
              </a>
              .
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
