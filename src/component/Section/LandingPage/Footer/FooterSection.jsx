import React from "react";
import logo from "../../../../../public/Logo/1.png";

export const FooterSection = () => {
  return (
    <footer class="bg-gray-50 pb-10">
      <div class="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
        <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <div class="text-center">
          <a
            href="#home"
            class="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 "
          >
            <img src={logo} className="h-6 mr-3 sm:h-9" />
            <span className="text-black text-xl font-bold">lapor</span>{" "}
            <span className="text-blue-500 ml-1 text-xl font-bold">
              {" "}
              Parkir
            </span>
          </a>
          <span class="block text-sm text-center text-gray-500 ">
            © 2024 Lapor Parkir™. All Rights Reserved. Built with{" "}
            <a href="https://react.dev/" class="text-blue-600 hover:underline ">
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
  );
};
