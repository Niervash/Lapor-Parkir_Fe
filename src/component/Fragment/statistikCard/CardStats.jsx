import React, { useState, useEffect, Children } from "react";
import PropTypes from "prop-types";
import { StatusCard } from "../../bases/CardStats/StatusCard";
import { NumberStats } from "../NumberStats/NumberStats";

export const CardStats = ({ Children, labels }) => {
  return (
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
      <StatusCard label={labels}>{Children}</StatusCard>
    </div>
  );
};

CardStats.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.string.isRequired,
  Item: PropTypes.object.isRequired, // Ensure data is an object
  setItem: PropTypes.func.isRequired, // Ensure setData is a function
};
