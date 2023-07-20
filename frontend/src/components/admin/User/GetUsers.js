import { useState } from "react";
import AddUser from "./AddUsers";
import EditUsers from "./EditUsers";

const GetUsers = () =>{

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    
    return(
        <>
            <div className="mx-5 p-5 rounded-lg border-solid border-2 border-indigo-600 my-5 min-h-screen">
            <AddUser isOpen={isOpenAdd} closeModal={()=>setIsOpenAdd(false)}></AddUser>
            <EditUsers isOpen={isOpenEdit} closeModal={()=>setIsOpenEdit(false)}/>
            <div className="float-right my-2">

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={()=>setIsOpenAdd(true)}>
                    AddUser
                </button>

            </div>
            <table className=" table-fixed rounded-lg lg:table-auto w-full border-solid border-2 border-collapse border border-slate-400">
                <thead>
                    <tr className="text-left bg-gray-300">
                    <th className="mx-3 px-3 w-[2rem]">Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Image</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="even:bg-gray-200 odd:bg-gray-100">
                        <td className="mx-3 px-3">1</td>
                        <td>Dang Van Cuong</td>
                        <td style={{wordWrap: "break-word", overflowWrap:"break-word"}}>emoaly@gmail.com</td>
                        <td style={{wordWrap: "break-word", overflowWrap:"break-word"}}>0987654321</td>
                        <td><img className="h-10 w-10" src="https://www.vnu.edu.vn/upload/2012/04/12715/image/VNU-UET.jpg" alt="..."></img></td>
                        <td>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
                            onClick={()=>setIsOpenEdit(true)}
                        >
                            Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 me-2 my-1 px-2 rounded">
                            Delete
                        </button>
                        </td>
                    </tr>
                    <tr className="even:bg-gray-200 odd:bg-gray-100">
                        <td className="mx-3 px-3">2</td>
                        <td>Le To Hieu</td>
                        <td style={{wordWrap: "break-word", overflowWrap:"break-word"}}>hieupotato2003@gmail.com</td>
                        <td style={{wordWrap: "break-word", overflowWrap:"break-word"}}>0337104921</td>
                        <td><img className="h-10 w-10" src="https://www.vnu.edu.vn/upload/2012/04/12715/image/VNU-UET.jpg" alt="..."></img></td>
                        <td>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
                            onClick={()=>setIsOpenEdit(true)}
                        >
                            Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 me-2 my-1 px-2 rounded">
                            Delete
                        </button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
            
            
        </>
    )
}

export default GetUsers;