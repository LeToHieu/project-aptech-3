import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { toast } from 'react-toastify'
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../../api/axios";
import parseJson from "../../../Parse"
const GET_User = "User/"
function AddBills({ isOpen, closeModal }) {
  const [searchUserId, setSearchUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState([
    { name: "Product 1", price: 10 },
    { name: "Product 2", price: 20 },
    { name: "Product 3", price: 15 },
  ]);
  const handleCancle = () => {
    setSearchUserId("");
    setUserData(null)
    closeModal();
  }

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
      let convert = parseJson(user.data.json)
      setUserData({
        name: convert.Username,
        email: convert.Email,
        phone: convert.Phone
      })
      toast.success("Tìm thấy người dùng");
    } catch (error) {
      toast.error(error.message);
    }
  };


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
        <AddIcon
          className="absolute top-2 right-2 hover:opacity-50 cursor-pointer"
          onClick={closeModal}
        />

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
          )}

          {userData && (
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
          )}

          {userData && (
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
          )}
          {userData && (
            <div className="w-full mt-4">
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
                        //onClick={() => handleDeleteProduct(index)}
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
          }
          <div className="md:flex md:items-center mt-4">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-2"
                type="button"
              >
                Save
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
