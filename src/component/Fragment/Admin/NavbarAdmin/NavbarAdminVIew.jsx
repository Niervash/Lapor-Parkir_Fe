import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import "leaflet/dist/leaflet.css";

export const NavbarAdminVIew = ({
  children,
  LabelsBreadcrumb,
  Breadcrumb,
  ClassName,
  bgClass = "bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg')]",
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // const fetchDataStats = async () => {
    //   try {
    //     const response = await fetch(
    //       `https://laporparkir-application.onrender.com/dashboard`
    //     );
    //     const result = await response.json();
    //     if (result) {
    //       setData(result);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchDataStats();

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // Toggle sidebar based on the screen width
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="m-0 font-sans text-base antialiased font-normal bg-white leading-default bg-gray-50 text-slate-500">
      <aside
        className={`fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 ${
          isSidebarOpen ? "ml-6" : "-translate-x-full"
        } bg-white border-0 drop-shadow-lg max-w-64 ease-nav-brand z-990 rounded-2xl left-0`}
        aria-expanded={isSidebarOpen}
      >
        {/* Header title */}
        <div className="h-19">
          <i
            className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"
            onClick={toggleSidebar}
          ></i>
          <a
            className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"
            href="https://demos.creative-tim.com/argon-dashboard-tailwind/pages/dashboard.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="../assets/img/logo-ct-dark.png"
              className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8"
              alt="main_logo"
            />
            <img
              src="../assets/img/logo-ct.png"
              className="hidden h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8"
              alt="main_logo"
            />
            <span className="text-black ml-4">Argon Dashboard 2</span>
          </a>
        </div>
        {/* End header title */}
        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full mt-5">
          <ul className="flex flex-col pl-0 mb-0">
            <li className="mt-0.5 w-full">
              <Link
                className="py-2.7 bg-blue-500/13 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors"
                to="/user-dashboard/home"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className="relative top-0 text-sm leading-normal text-blue-500 ni ni-tv-2"></i>
                </div>
                <span className="text-black ml-1 duration-300 opacity-100 pointer-events-none ease hover:text-blue-500">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="w-full mt-4">
              <h6 className="text-black pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60">
                Menu Pages
              </h6>
            </li>
            <li className="mt-0.5 w-full">
              <Link
                className="py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
                to="/user-dashboard/parkir-liar"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className="relative top-0 text-sm leading-normal text-orange-500 ni ni-calendar-grid-58"></i>
                </div>
                <span className="text-black ml-1 duration-300 opacity-100 pointer-events-none ease">
                  PL Table's
                </span>
              </Link>
            </li>
            <li className="mt-0.5 w-full">
              <Link
                className="py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
                to="/user-dashboard/petugas-liar"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className="relative top-0 text-sm leading-normal text-emerald-500 ni ni-calendar-grid-58"></i>
                </div>
                <span className="text-black ml-1 duration-300 opacity-100 pointer-events-none ease">
                  PTL Table's
                </span>
              </Link>
            </li>
            <li className="w-full mt-4">
              <h6 className="text-black pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60">
                Account pages
              </h6>
            </li>
            <li className="mt-0.5 w-full">
              <Link
                className="text-white opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
                to="/user-dashboard/edit-profile"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className="relative top-0 text-sm leading-normal text-slate-700 ni ni-single-02"></i>
                </div>
                <span className="text-black ml-1 duration-300 opacity-100 pointer-events-none ease">
                  Profile
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-4">
          <div
            className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border"
            sidenav-card
          >
            <img
              className="w-1/2 mx-auto"
              src="../assets/img/illustrations/icon-documentation.svg"
              alt="sidebar illustrations"
            />
            <div className="flex-auto w-full p-4 pt-0 text-center">
              <div className="transition-all duration-200 ease-nav-brand">
                <h6 className="mb-0 text-slate-700">Anda Resah?</h6>
                <p className="mb-0 text-xs font-semibold leading-tight">
                  Segeralah Laporkan
                </p>
              </div>
            </div>
          </div>
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/argon-dashboard/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full px-8 py-2 mb-4 text-xs font-bold leading-normal text-center text-white capitalize transition-all ease-in rounded-lg shadow-md bg-slate-700 bg-150 hover:shadow-xs hover:-translate-y-px"
          >
            Sign Out
          </a>
        </div>
      </aside>
      <div className={`absolute bg-y-50 w-full top-0 ${bgClass} min-h-75`}>
        <span className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-60"></span>
      </div>
      {/* Start content */}
      <main className={ClassName}>
        <nav
          className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start"
          navbar-main
          navbar-scroll="false"
        >
          {/* Start Breadcrumb */}
          <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
            <nav>
              <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                <li className="text-white opacity-50">Pages</li>
                <li
                  className="text-sm pl-2 capitalize leading-normal text-white before:float-left before:pr-2 before:text-white before:content-['/']"
                  aria-current="page"
                >
                  {Breadcrumb}
                </li>
              </ol>
              <h6 className="mb-0 font-bold text-white capitalize">
                {LabelsBreadcrumb}
              </h6>
            </nav>
            <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
              <div className="flex items-center md:ml-auto md:pr-4"></div>
              <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                <li>
                  <button className="w-12 h-12 rounded-full border-4 border-emerald-400 hover:bg-transparent flex items-center justify-center transition duration-200 drop-shadow-xl">
                    <img
                      src="../assets/img/carousel-1.jpg"
                      alt="User"
                      className="w-10 h-10 rounded-full shadow-lg opacity-95 transition-opacity duration-200 hover:opacity-50"
                    />
                  </button>
                </li>
                <li className="flex items-center">
                  <a
                    href="../pages/sign-in.html"
                    className="block px-0 py-2 text-sm font-semibold text-white transition-all ease-nav-brand"
                  >
                    <i className="fa fa-user sm:mr-1"></i>
                  </a>
                </li>
                <li className="flex items-center pl-4 xl:hidden">
                  <button
                    onClick={toggleSidebar}
                    className="block p-0 text-sm text-white transition-all ease-nav-brand"
                  >
                    <div className="w-4.5 overflow-hidden">
                      <RxHamburgerMenu />
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {children}
      </main>
    </div>
  );
};
