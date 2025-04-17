import React from "react";
import PropTypes from "prop-types";

export const StatusCard = ({ children, label }) => {
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl  rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-row -mx-3">
          <div className="flex-none w-2/3 max-w-full px-3">
            <div>
              <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase ">
                {label}
              </p>

              <h5 className="mb-2 font-bold ">{children}</h5>
              {/* start counting algorithm content */}
              <p className="mb-0 ">
                <span className="text-sm font-bold leading-normal text-sky-400">
                  Lapor
                </span>{" "}
                Parkir
              </p>
              {/* end  */}
            </div>
          </div>
          <div className="px-3 text-right basis-1/3">
            <div className="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-blue-500 to-violet-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

StatusCard.propTypes = {
  children: PropTypes.node,
};
