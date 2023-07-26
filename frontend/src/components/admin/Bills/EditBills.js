import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function EditBills({ isOpen, closeModal }) {
  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="bg-white rounded-lg shadow-lg lg:min-w-[40rem] h-[20rem] min-h-[4rem]">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-300 rounded-t-lg">
          <div className="text-xl font-bold">Thêm hoá đơn</div>
          <CloseIcon
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={closeModal}
          />
        </div>

        <div className="p-4">
          <div className="flex mb-4">
            <label className="w-[7rem] flex-shrink-0">Name: </label>
            <input
              className="flex-1 ml-3 px-4 py-2 border-2 border-black-600 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Categories Name"
            />
          </div>
          <div className="flex">
            <label className="w-[7rem] flex-shrink-0">Description: </label>
            <textarea
              className="flex-1 ml-3 px-4 py-2 border-2 border-black-600 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Categories Description"
            />
          </div>
        </div>

        <div className="flex justify-end px-4 py-2">
          <button className="px-4 py-2 text-white font-bold bg-blue-500 rounded hover:bg-blue-700 focus:outline-none">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBills;
