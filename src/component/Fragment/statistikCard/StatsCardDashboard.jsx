import React, { useState, useEffect } from "react";
import { NumberStats } from "../NumberStats/NumberStats";
import { StatusCard } from "../../bases/CardStats/StatusCard";
import { fetchDashboardData } from "../../../config/Auth/Auth";

export const StatsCardDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const result = await fetchDashboardData();
        console.log(result);
        setData(result);
      } catch (error) {
        setError(error.message || "An error occurred");
      }
    };

    FetchData();
  }, []);

  return (
    <div className="flex flex-wrap -mx-3">
      <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <StatusCard label="User Count">
          <NumberStats n={data?.userCount || 0} />
        </StatusCard>
      </div>
      <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <StatusCard label="Report Accepted">
          <NumberStats n={data?.totalApprove || 0} />
        </StatusCard>
      </div>
      <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <StatusCard label="PTL Report">
          <NumberStats n={data?.laporanPetugasCount || 0} />
        </StatusCard>
      </div>
      <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <StatusCard label="PL Report">
          <NumberStats n={data?.laporanParkirCount || 0} />
        </StatusCard>
      </div>
    </div>
  );
};
