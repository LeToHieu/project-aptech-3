import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../api/axios";
import parseJson from "../../Parse";
import {toast} from 'react-toastify'

function Cart() {
  const [order, setOrder] = useState([])
  let { user } = useSelector(state => state.user)
  async function fetchData() {
    const response = await axios.get("Order/GetByUserId/" + user.id, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    console.log(parseJson(response.data.json))
    const ordersWithStatus1 = parseJson(response.data.json).filter(order => order.status_order === 0);
    setOrder(ordersWithStatus1);
  }
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, order])
  console.log(order)
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const response = await axios.post("Order_Detail/delete/" + id, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    if(response.data) {
      toast.success("Xoá thành công")
    } else {
      toast.error("Có lỗi xảy ra")
    }
    fetchData();
  }
  const handleAdd = async (e) => {
    e.preventDefault();
    const data = {
      id: order[0].Id,
      total_amount: order.reduce((total, currentOrder) => {
        return total + currentOrder.Order_Detail.reduce((orderTotal, orderDetail) => orderTotal + orderDetail.price, 0);
      }, 0)
    }
    const response = await axios.post("Order/edit/" + order[0].Id, data,{
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (response.data) {
      toast.success("Mua thành công");
    } else {
      toast.error("Mua không thành công");
    }
  }
  return (
    <>
      <div className="bg-neutral-50 py-12">
        <div className="container mx-auto my-12">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1 shrink-0 rounded-sm border border-neutral-200 bg-white px-4 py-8 shadow-sm overflow-y-auto">
              <div class="mb-8">
                <h3 class="text-2xl font-bold">OnlineShop4DVDS (2 items)</h3>
                <p>Welcome to OnlineShop4DVDS</p>
              </div>
              <ul role="list" class="-my-6 divide-y divide-neutral-200">
                {order.map(order => (
                  <div key={order.Id}>

                    {order.Order_Detail.map((order, index) => (
                      <li class="flex py-6" key={index}>
                        {order?.Media ? (
                          <div class="h-32 w-24 flex-shrink-0 overflow-hidden rounded-sm border bg-neutral-50">
                            <img src={"https://localhost:7023/resources/" + order?.Media?.MediaImage} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center" />
                          </div>
                        ) : (
                          <></>
                        )}


                        <div class="ml-4 flex flex-1 flex-col">
                          <div>
                            <div class="flex justify-between text-sm text-gray-900">
                              <h3 class="text-base font-bold"> {order?.Media ? order?.Media?.MediaName : order.Album.AlbumName}</h3>
                              <form action="">
                                <button type="button" class="flex gap-2 font-medium text-neutral-400 hover:text-neutral-900" onClick={(e) => handleDelete(e, order?.Id)}>
                                  <p class="text-xs font-normal">Delete</p>
                                  <svg class="h-4 w-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                              </form>
                            </div>
                          </div>
                          <div class="mt-auto flex flex-1 items-end justify-between text-sm">
                            <div>
                            </div>

                            <div class="flex">
                              <div class="text-right">
                                <p class="text-sm font-bold text-orange-600">${order?.price}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            </div>

            <div class="sticky space-y-4 rounded-sm border border-neutral-200 bg-white py-6 px-4 shadow-sm sm:px-6 md:w-1/3">

              <h4 class="text-2xl font-bold">Total price</h4>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between text-base text-gray-900">
                  <p>Total price</p>
                  <p>        {order.reduce((total, currentOrder) => {
                    return total + currentOrder.Order_Detail.reduce((orderTotal, orderDetail) => orderTotal + orderDetail.price, 0);
                  }, 0)} $</p>
                </div>

                <div class="mt-auto flex flex-col gap-2 pt-4">
                  <div class="">
                    <button class="flex items-center justify-center rounded-md border border-transparent bg-neutral-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-neutral-900" onClick={(e) => handleAdd(e)}>Pay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Cart;
