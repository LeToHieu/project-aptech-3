import { useState } from "react";
import { Link } from "react-router-dom";

const AddMedia = () =>{    
    return(
        <>
            <div className="mx-5 p-5 rounded-lg border-solid border-2 border-indigo-600 my-5 min-h-screen">
                <div className="my-2 pb-5">
                    <div className="float-left ">Add Media</div>
                    <button className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                            >
                        Back
                    </button>
                </div>

                <div className="grid lg:md:grid-cols-2 sm:grid-cols-1 pt-5 mx-auto">
                    <div className="flex">
                        <label className="w-[4rem] flex items-center justify-center">Name: </label>
                        <input className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"  placeholder="Media Name"></input>
                    </div>
                    <div className="flex">
                        <label className="w-[4rem] flex items-center justify-center">Categories: </label>
                        <select className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3" >
                            <option>Phim Hoat Hinh</option>
                            <option>Vo Thuat</option>
                        </select>
                    </div>
                    <div className="flex">
                        <label className="w-[4rem] flex items-center justify-center" >Type: </label>
                        <select className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3">
                            <option>Video</option>
                            <option>Music</option>
                        </select>
                    </div>
                    <div className="flex">
                        <label className="w-[4rem] flex items-center justify-center" >Media Path: </label>
                        <input type='file'  className="text-sm w-[13rem] h-[2rem] m-3" ></input>
                    </div>
                    <div className="flex">
                        <label className="w-[4rem] flex items-center justify-center" >Price: </label>
                        <input className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3" placeholder="Media's Price"/>
                    </div>
                </div>
                <button className="mt-3 mx-5 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
            
            </div>
            
            
        </>
    )
}

export default AddMedia;