import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../../api/axios";
import parseJson from "../../../Parse";
import MediaModal from "./MediaModal";

const GET_User = "User/";

function AddBills({ isOpen, closeModal, fetchData }) {
  const [searchUserId, setSearchUserId] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState([]);

  const handleCancle = () => {
    setSearchUserId("");
    setUserData(null);
    setProductData([])
    closeModal();
  };

  const handleDeleteProduct = (index) => {
    setProductData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchUserId) {
      toast.error("Vui lòng nhập User ID");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const user = await axios.get(GET_User + searchUserId, config);
      let convert = parseJson(user.data.json);
      setUserData({
        id: convert.Id,
        name: convert.Username,
        email: convert.Email,
        phone: convert.Phone,
      });
      toast.success("Tìm thấy người dùng");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleAdd = async () => {
    if (!userData || productData.length === 0) {
      toast.error(
        "Vui lòng nhập thông tin người dùng và chọn ít nhất một sản phẩm."
      );
      return;
    }
  
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const orderData = {
      userId: userData.id,
      orderDate: new Date().toISOString(),
      total_amount: parseFloat(getTotalBill()),
    };
  
    try {
      const orderResponse = await axios.post("Order/add", orderData, config);
      const newOrder = orderResponse.data.newOrder;
  
      if (newOrder) {
        for (const product of productData) {
          const orderDetailData = {
            orderId: newOrder.id,
            albumId: product.type === "album" ? product.id : 0,
            mediaId: product.type === "media" ? product.id : 0,
            price: parseFloat(product.price),
          };
          
          const orderDetailResponse = await axios.post(
            "Order_Detail/add",
            orderDetailData,
            config
          );

          if (!orderDetailResponse.data.status) {
            toast.error(
              `Có lỗi xảy ra khi thêm sản phẩm ${product.name} vào đơn hàng.`
            );
          }
        }
  
        toast.success("Thêm đơn hàng thành công!");
        fetchData();
        closeModal();
      } else {
        toast.error("Có lỗi xảy ra khi thêm đơn hàng.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Thêm đơn hàng không thành công");
    }
  };
  
  const addProductData = (data) => {
    setProductData((prevData) => (prevData ? [...prevData, data] : [data]));
  };
  const getTotalBill = () => {
    let total = 0;
    productData.forEach((product) => {
      total += parseFloat(product.price);
    });
    return total.toFixed(2);
  };
  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center ${isOpen ? "" : "hidden"
        }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <MediaModal
        isOpen={isOpenForm}
        closeModal={() => setIsOpenForm(false)}
        addProductData={addProductData}
      ></MediaModal>
      <div
        id="section2"
        className="p-8 mt-6 lg:mt-0 rounded shadow bg-white relative"
      >
        {userData && (
          <AddIcon
            className="absolute top-2 right-2 hover:opacity-50 cursor-pointer"
            onClick={() => setIsOpenForm(true)}
          />
        )}

        <form>
          <div className="md:flex mb-6 items-center">
            <div className="md:w-1/3">
              <label
                className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                htmlFor="user-id-input"
              >
                User ID
              </label>
            </div>
            <div className="md:w-2/3 relative">
              <input
                className="form-input block w-full focus:bg-white"
                id="user-id-input"
                type="text"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
              />
              <button
                className="absolute right-0 top-0 h-full px-4 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                onClick={(e) => handleSearch(e)}
              >
                Search
              </button>
            </div>
          </div>

          {userData && (
            <>
              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                    Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <p>{userData.name}</p>
                </div>
              </div>

              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                    Email
                  </label>
                </div>
                <div className="md:w-2/3">
                  <p>{userData.email}</p>
                </div>
              </div>

              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                    Phone
                  </label>
                </div>
                <div className="md:w-2/3">
                  <p>{userData.phone}</p>
                </div>
              </div>

              <div className="w-full mt-4">
                {productData ? (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 text-left border">Tên sản phẩm</th>
                        <th className="py-2 px-4 text-left border">Giá bán</th>
                        <th className="py-2 px-4 border"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {productData.map((product, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4 border">{product.name}</td>
                          <td className="py-2 px-4 border">{product.price}</td>
                          <td className="py-2 px-4 border">
                            <button
                              className="text-red-500 hover:text-red-700 focus:outline-none"
                              onClick={() => handleDeleteProduct(index)}
                            >
                              <DeleteIcon fontSize="small" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No product data available.</p>
                )}
              </div>
              {userData && (
                <div className="mt-4">
                  <p className="text-xl font-semibold">Tổng hoá đơn: ${getTotalBill()}</p>
                </div>
              )}
            </>
          )}


          <div className="md:flex md:items-center mt-4">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-2"
                type="button"
                onClick={handleAdd}
              >
                Add
              </button>
              <button
                className="shadow bg-red-700 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleCancle}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBills;
