import React from "react";

const FileInput = ({
  htmlFor = "file_input",
  id = "file_input",
  type = "file",
  Label = "Bukti",
}) => {
  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
        htmlFor={htmlFor}
      >
        {Label}
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id={id}
        type={type}
      />
      <div className="text-gray-900 dark:text-white text-[12px] ml-1 mt-1">
        * Upload Bukti Pelanggaran seperti tidak adanya pengenal pada petugas
        parkir dll.
      </div>
    </div>
  );
};

export default FileInput;
