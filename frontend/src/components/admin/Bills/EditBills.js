import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

function EditBills({ isOpen, closeModal, orderProducts }) {
  console.log(orderProducts);
  if (!orderProducts) {
    return <p>Không có dữ liệu hoặc đang tải...</p>;
  }

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
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((product) => (
                <tr key={product.Id} className="mb-4">
                  <td className="p-2 border">{product.AlbumId || product.MediaId}</td>
                  <td className="p-2 border">${product.price}</td>
                  <td className="p-2 border">{product.Id === product.AlbumId ? "Album" : "Media"}</td>
                  <td className="p-2 border">
                    <button className="focus:outline-none">
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
