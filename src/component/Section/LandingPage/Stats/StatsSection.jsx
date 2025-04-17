import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../../../../config/Auth/Auth";

export const StatsSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const result = await fetchDashboardData();
        setData(result);
      } catch (error) {
        setError(error.message || "An error occurred");
      }
    };

    FetchData();
  }, []);
  return (
    <section class="bg-white mt-12">
      <div class="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
        <div class="grid grid-cols-2 text-center gap-8 text-gray-500 sm:gap-12 sm:grid-cols-4 lg:grid-cols-4">
          <div class="flex flex-col items-center justify-center">
            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase">
              User Count
            </p>
            <p>{data?.userCount || 0}</p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase">
              Report Accepted
            </p>
            <p>{data?.totalApprove || 0}</p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase">
              PTL Report
            </p>
            <p>{data?.laporanPetugasCount || 0}</p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase">
              PL Report
            </p>
            <p>{data?.laporanParkirCount || 0}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
