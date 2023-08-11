import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../../api/axios";
import parseJson from "../../../Parse";
import { toast } from "react-toastify";

function EditBills({ isOpen, closeModal, orderProducts, setOrderProducts, fetchData }) {
  const [product_data, setProduct] = useState([]);

  const calculateTotalAmount = (data) => {
    let totalAmount = 0;
    data.forEach((product) => {
      totalAmount += product.price;
    });
    return totalAmount.toFixed(2);
  };
  const [totalAmount, setTotal] = useState(0);
  useEffect(() => {
    if (orderProducts) {
      const updatedTotalAmount = calculateTotalAmount(orderProducts);
      setTotal(parseFloat(updatedTotalAmount));
      setProduct(orderProducts);
    }
  }, [orderProducts]);

  const fetchData_Edit = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await axios.get('Order_Detail/GetByOrderId/' + orderProducts[0].OrderId, config);
    let data = await parseJson(result.data.json);
    const updatedTotalAmount = calculateTotalAmount(data);

    setOrderProducts(data);
    setTotal(updatedTotalAmount);
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this product?");
    if (shouldDelete) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        debugger
        const data = await axios.post("Order_Detail/delete/" + id, config);
        // await fetchData_Edit();
        if (data.data) {
          const newProducts = product_data.filter((product) => product.Id !== id)
          const result = calculateTotalAmount(newProducts);
          const updateData = {
            Id: product_data[0].OrderId,
            total_amount: result,
          };
          setProduct(newProducts)
          setTotal(result)
          await axios.post("Order/edit/" + product_data[0].OrderId, updateData, config);
          toast.success("Cập nhập dữ liệu thành công");

          await fetchData();
        }

      } catch (error) {
        toast.error(error.message);
      }
    }
  };

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
                <th className="p-2 border">ID sản phẩm</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {product_data.map((product) => (
                <tr key={product.Id} className="mb-4">
                  <td className="p-2 border">{product.AlbumId || product.MediaId}</td>
                  <td className="p-2 border">${product.price}</td>
                  <td className="p-2 border">{product.Id === product.AlbumId ? "Album" : "Media"}</td>
                  <td className="p-2 border">
                    <button className="focus:outline-none" onClick={() => handleDelete(product.Id)}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-xl">Tổng hoá đơn: ${totalAmount}</p>
        </div>

        <div className="mt-4 flex justify-end">
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
