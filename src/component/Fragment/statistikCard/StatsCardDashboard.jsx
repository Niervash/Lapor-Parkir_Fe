import React, { useState, useEffect } from "react";
import { NumberStats } from "../NumberStats/NumberStats";
import { StatsFetch } from "../../../config/network-data";

export const StatsCardDashboard = () => {
  const [data, setData] = useState({
    userCount: 0,
    totalApprove: 0,
    laporanPetugasCount: 0,
    laporanParkirCount: 0,
  });

  useEffect(() => {
    StatsFetch(setData);
  }, []);
  return (
    <div className="max-w-screen-xl px-4 pb-5 mx-auto lg:pb-16">
      <h1 className="text-2xl ml-10 font-medium text-left mb-8 italic text-slate-50 mt-3">
        Stats Overview
      </h1>
      <div className="grid grid-cols-2 gap-8 text-gray-800 sm:gap-12 sm:grid-cols-3 lg:grid-cols-4 dark:text-gray-400">
        <a className="flex items-center lg:justify-center">
          <NumberStats n={data.totalApprove} label="Pelaporan Terpublikasi" />
        </a>
        <a className="flex items-center lg:justify-center">
          <NumberStats
            n={data.laporanParkirCount}
            label="Pelaporan Parkir Liar"
          />
        </a>
        <a className="flex items-center lg:justify-center">
          <NumberStats
            n={data.laporanPetugasCount}
            label="Pelaporan Petugas Parkir Liar"
          />
        </a>
      </div>
    </div>
  );
};
