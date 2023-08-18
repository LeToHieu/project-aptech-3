import React, { useEffect, useState } from 'react'
import axios from '../../api/axios'
import parseJson from '../../Parse'
import { useSelector } from 'react-redux'
function Bill() {
    const [order, setOrder] = useState([])
    let { user } = useSelector(state => state.user)
    console.log(user)
    async function fetchData() {
        const response = await axios.get("Order/GetByUserId/" + user.id, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log(parseJson(response.data.json))
        const ordersWithStatus1 = parseJson(response.data.json).filter(order => order.status_order === 1);
        setOrder(ordersWithStatus1);
    }
    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user, order])
    return (
        <div>
            {order.map(order => (

                <div key={order.Id} class="flex items-center justify-center py-10 bg-gray-100">
                    <div class="w-3/5 bg-white shadow-lg">
                        <div class="flex justify-between p-4">
                            <div>
                                <h1 class="text-3xl italic font-extrabold tracking-widest text-blue-500">OnlineShop4DVDS</h1>
                                <p class="text-base">If account is not paid within 7 days the credits details supplied as
                                    confirmation.</p>
                            </div>

                        </div>
                        <div class="w-full h-0.5 bg-indigo-500"></div>
                        <div class="flex justify-between p-4">
                            <div>
                                <h6 class="font-bold">Order Date : <span class="text-sm font-medium"> {order.orderDate}</span></h6>
                                <h6 class="font-bold">Order ID : <span class="text-sm font-medium"> {order.Id}</span></h6>
                            </div>
                            <div class="w-40">
                                <address class="text-sm">
                                    <span class="font-bold"> Telephone : {order.User.Phone}</span>

                                </address>
                            </div>
                            <div></div>
                        </div>
                        <div class="flex justify-center p-4">
                            <div class="border-b border-gray-200 shadow">
                                <table className="">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-xs text-gray-500 ">
                                                #
                                            </th>
                                            <th className="px-4 py-2 text-xs text-gray-500 ">
                                                Product Name
                                            </th>
                                            <th className="px-4 py-2 text-xs text-gray-500 ">
                                                Description
                                            </th>
                                            <th className="px-4 py-2 text-xs text-gray-500 ">
                                                Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {order.Order_Detail.map((order, index) => (
                                            <tr className="whitespace-nowrap" key={index}>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {order.Id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        {order.Album ? order.Album.AlbumName : order.Media.MediaName}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {order.Album ? (
                                                        <div className="text-sm text-gray-900">
                                                            {order.Album.Description}
                                                        </div>
                                                    ) : (
                                                        <img width='100px' src={"https://localhost:7023/resources/"+ order.Media.MediaImage}></img>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    ${order.price}
                                                </td>
                                            </tr>
                                        ))}

                                        <tr className="text-white bg-gray-800">
                                            <th colSpan="2"></th>
                                            <td className="text-sm font-bold"><b>Total</b></td>
                                            <td className="text-sm font-bold"><b>${order.total_amount}</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="flex justify-between p-4">
                            <div>
                                <h3 class="text-xl">Terms And Condition :</h3>
                                <ul class="text-xs list-disc list-inside">
                                    <li>All accounts are to be paid within 7 days from receipt of invoice.</li>
                                    <li>To be paid by cheque or credit card or direct payment online.</li>
                                    <li>If account is not paid within 7 days the credits details supplied.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="w-full h-0.5 bg-indigo-500"></div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Bill
