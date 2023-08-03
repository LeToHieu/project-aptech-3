import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

function EditBills({ isOpen, closeModal, orderProducts }) {
  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center ${isOpen ? "" : "hidden"
        }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        id="section2"
        className="p-8 mt-6 lg:mt-0 rounded shadow bg-white relative"
      >
        <CloseIcon
          className="absolute top-2 right-2 hover:opacity-50 cursor-pointer"
          onClick={closeModal}
        />

        <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h2>

        <ul>
          {/* {orderProducts.map((product) => (
            <li key={product.id} className="mb-4 flex items-center">
              <div>
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <div className="ml-4 flex-grow">
                <p className="font-semibold">{product.productName}</p>
                <p className="text-gray-600">${product.price}</p>
              </div>
              <div>
                <button className="focus:outline-none">
                  <DeleteIcon />
                </button>
              </div>
            </li>
          ))} */}
          <li className="mb-4 flex items-center">
            <div>
              <img
                src=""
                alt=""
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="ml-4 flex-grow">
              <p className="font-semibold">Media</p>
              <p className="text-gray-600">$100</p>
            </div>
            <div>
              <button className="focus:outline-none">
                <DeleteIcon />
              </button>
            </div>
          </li>
        </ul>

        <div className="mt-4 flex justify-end">
          <button
            className="mr-2 shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Update
          </button>
          <button
            className="shadow bg-red-700 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBills;
