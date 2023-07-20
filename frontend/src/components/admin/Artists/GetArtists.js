import { useState } from "react";
 import AddArtist from "./AddArtist";
 import EditArtist from "./EditArtist";

const GetArtists = () =>{

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);


    
    return(
        <>
            <div className="mx-5 p-5 rounded-lg border-solid border-2 border-indigo-600 my-5 min-h-screen">
            <AddArtist isOpen={isOpenAdd} closeModal={()=>setIsOpenAdd(false)}></AddArtist>
            <EditArtist isOpen={isOpenEdit} closeModal={()=>setIsOpenEdit(false)}/>
            <div className="float-right my-2">

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={()=>setIsOpenAdd(true)}>
                    Add Artists
                </button>

            </div>
            <table className=" table-fixed rounded-lg lg:table-auto w-full border-solid border-2 border-collapse border border-slate-400">
                <thead>
                    <tr className="text-left bg-gray-300">
                    <th className="mx-3 px-3 w-[2rem]">Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="even:bg-gray-200 odd:bg-gray-100">
                        <td className="mx-3 px-3">1</td>
                        <td>Joji</td>
                        <td >
                        Meme, Sad Song, Lmao, ...
                        </td>
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

export default GetArtists;