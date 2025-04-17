import React from "react";

const FileInput = ({
  htmlFor = "file_input",
  id = "file_input",
  type = "file",
  Label = "Bukti",
  accept = "image/*",
  onChange,
}) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(file);
    }
  };

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 text-black"
        htmlFor={htmlFor}
      >
        {Label}
      </label>
      <input
        className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none bg-gray-200 border-gray-300 placeholder-black hover:bg-gray-100"
        id={id}
        type={type}
        accept={accept}
        onChange={handleFileChange}
      />
      <div className="text-gray-900 text-black text-[12px] ml-1 mt-1">
        * Upload Foto Bukti Pelanggaran seperti tidak adanya pengenal pada
        petugas parkir dll.
      </div>
    </div>
  );
};

export default FileInput;
