import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import "leaflet/dist/leaflet.css";
import logo from "../../../public/Logo/1.png";
import defaultProfile from "../../../public/Logo/profil.jpg";
import { setLogout } from "../../config/SetItem";
import { GetUserLoged } from "../../config/Auth/Auth";
import PropTypes from "prop-types";

export const AdminLayout = ({
  children,
  ProfilAct,
  DashboardAct,
  ParkirAct,
  PetugasAct,
  LabelsBreadcrumb,
  Breadcrumb,
  ClassName,
  bgClass = "bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg')]",
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem("profilePicture") || defaultProfile
  );
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await GetUserLoged();
        if (result.foto_profil) {
          setProfilePicture(result.foto_profil);
          localStorage.setItem("profilePicture", result.foto_profil);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Optionally, provide user feedback here
      }
    };

    if (profilePicture === defaultProfile) {
      getData();
    }

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [profilePicture]);

  const handleLogout = () => {
    setLogout();
    localStorage.removeItem("profilePicture");
    navigate("/");
  };

  return (
    <div className="m-0 font-sans text-base antialiased font-normal bg-white leading-default bg-gray-50 text-slate-500 ">
      <aside
        className={`fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 ${
          isSidebarOpen ? "ml-6" : "-translate-x-full"
        } bg-white border-0 drop-shadow-lg max-w-64 ease-nav-brand z-990 rounded-2xl left-0 z-50`}
        aria-expanded={isSidebarOpen}
      >
        <div className="h-19">
          <i
            className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"
            onClick={toggleSidebar}
          ></i>
          <Link
            className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"
            to="/"
            rel="noopener noreferrer"
          >
            <img
              src={logo}
              className="mr-2 inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8"
              alt="main_logo"
            />

            <span className="text-black ml-4">
              <span className="text-sky-400 font-bold">Lapor</span>{" "}
              <span className="font-bold text-gray-500">Parkir</span>
            </span>
          </Link>
        </div>
        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full ">
          <ul className="flex flex-col pl-0 mb-0 mt-5">
            <li className="mt-0.5 w-full">
              <Link
                className={`py-2.7 ${DashboardAct} text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 text-slate-700 transition-colors`}
                to="/admin/home"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className="relative top-0 text-sm leading-normal text-blue-500 ni ni-tv-2"></i>
                </div>
                <span className="text-black ml-1 duration-300 opacity-100 pointer-events-none ease hover:text-blue-500">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="mt-0.5 w-full">
              <Link
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors mt-5 ${ParkirAct}`}
                to="/admin/parkir liar"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className="relative top-0 text-sm leading-normal text-orange-500 ni ni-calendar-grid-58"></i>
                </div>
                <span className="text-black ml-1 duration-300 opacity-100 pointer-events-none ease">
                  Laporan Parkir Liar
                </span>
              </Link>
            </li>
            <li className="mt-0.5 w-full">
              <Link
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${PetugasAct}`}
                to="/admin/petugas liar"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className="relative top-0 text-sm leading-normal text-emerald-500 ni ni-calendar-grid-58"></i>
                </div>
                <span className="text-black ml-1 duration-300 opacity-100 pointer-events-none ease">
                  Laporan Petugas Liar
                </span>
              </Link>
            </li>
            <li className="mt-0.5 w-full">
              <Link
                className={`text-white opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${ProfilAct} mt-5`}
                to="/admin/edit profile"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className="relative top-0 text-sm leading-normal text-slate-700 ni ni-single-02"></i>
                </div>
                <span className="text-black ml-1 duration-300 opacity-100 pointer-events-none ease">
                  My Profile
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-12">
          <div className="pb-24"></div>
          <a
            onClick={handleLogout}
            className="inline-block w-full px-5 py-2 mb-7 text-xs font-bold leading-normal text-center text-white capitalize transition-all ease-in rounded-lg shadow-md bg-slate-700 bg-150 hover:shadow-xs hover:-translate-y-px"
          >
            Sign Out
          </a>
        </div>
      </aside>
      <div className={`absolute bg-y-50 w-full top-0 ${bgClass} min-h-75`}>
        <span className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-60"></span>
      </div>
      <main className={ClassName}>
        <nav
          className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start"
          navbar-main
          navbar-scroll="false"
        >
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
                      src={defaultProfile}
                      alt="Admin"
                      className="w-10 h-10 rounded-full shadow-lg opacity-95 transition-opacity duration-200 hover:opacity-50"
                    />
                  </button>
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

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  ProfilAct: PropTypes.string,
  DashboardAct: PropTypes.string,
  ParkirAct: PropTypes.string,
  PetugasAct: PropTypes.string,
  LabelsBreadcrumb: PropTypes.string.isRequired,
  Breadcrumb: PropTypes.string.isRequired,
  ClassName: PropTypes.string,
  bgClass: PropTypes.string,
};
