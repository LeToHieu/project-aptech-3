import React, { useEffect, useState } from "react";
import AddBills from "./AddBills";
import EditBills from "./EditBills";
import axios from "../../../api/axios";
import Single_Table from "../Table/Single_Table";
import parseJson from "../../../Parse"
import { toast } from 'react-toastify'
const GET_Order = 'Order';
const DELETE_Order = 'Order/delete/'
const GET_Order_Detail = 'Order_Detail/GetByOrderId/'
function Bills() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [data, setData] = useState();
  const [orderProducts, setOrderProducts] = useState([]);
  const title = "Danh sách hoá đơn";
  const fetchData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    try {
      const result = await axios.get(GET_Order, config);
      setData(parseJson(result.data.json))
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const result = [];
  if (data) {

    for (let i = 0; i < data.length; i++) {
      let order_id = data[i].Id;
      let username = data[i].User.Username;
      let product_name = "";
      let total_amount = 0;
      let order_date = data[i].orderDate;

      for (let j = 0; j < data[i].Order_Detail.length; j++) {
        if (!data[i].Order_Detail[j].MediaId) {
          product_name += data[i].Order_Detail[j].Album.AlbumName + ", ";
        } else if (!data[i].Order_Detail[j].AlbumId) {
          product_name += data[i].Order_Detail[j].Media.MediaName + ", ";
        } else {
          product_name += data[i].Order_Detail[j].Media.MediaName + ", " + data[i].Order_Detail[j].Album.AlbumName + ", ";
        }
        total_amount += data[i].Order_Detail[j].price;
      }

      // Remove trailing comma and space from the product_name
      product_name = product_name.slice(0, -2);

      result.push({
        order_id: order_id,
        username: username,
        product_name: product_name,
        total_amount: total_amount,
        order_date: order_date,
      });
    }


  }
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        access: "order_id",
      },
      {
        Header: "Tên khách hàng",
        access: "username",
      },
      {
        Header: "Tên sản phẩm",
        access: "product_name",
      },
      {
        Header: "Thời gian đặt hàng",
        access: "order_date",
      },
      {
        Header: "Giá hoá đơn",
        access: "total_amount",
      },
    ],
    []
  );

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this order?");
    if (shouldDelete) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        await axios.post(DELETE_Order + id, config);
        toast.success("Xoá thành công");
        fetchData();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const handleUpdate = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // debugger
      const result = await axios.get(GET_Order_Detail + `${id}`, config);
      let data = parseJson(result.data.json)
      const orderProducts = data; 
      setIsOpenEdit(true);
      setOrderProducts(orderProducts);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24 z-0">
      <AddBills
        isOpen={isOpenAdd}
        closeModal={() => setIsOpenAdd(false)}
        fetchData={fetchData}
      ></AddBills>
      <EditBills
        isOpen={isOpenEdit}
        closeModal={() => setIsOpenEdit(false)}
        orderProducts={orderProducts}
      ></EditBills>
      <Single_Table
        columns={columns}
        setIsOpenAdd={setIsOpenAdd}
        setIsOpenEdit={setIsOpenEdit}
        title={title}
        propData={result}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      ></Single_Table>
    </div>
  );
}

export default Bills;
