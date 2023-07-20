import CloseIcon from '@mui/icons-material/Close';

const Edit = ({isOpen, closeModal})=>{
return(
    
    <>
    <div className={`modal ${isOpen ? "" : "hidden"}  place-content-center fixed z-10 inset-0 flex`} style={{backgroundColor: "gray", width: "100%", height: "100%", background:"rgba(0,0,0,0.5)"}}>
        <div className="rounded-lg bg-white lg:w-[40rem] lg:h-[20rem] mt-5">
            <div className="flex rounded-t-lg bg-slate-300 h-[2.25rem] items-center justify-between px-3">
                <div className='flex justify-end'>
                    Edit User
                </div>
                <CloseIcon className='justify-end float-right hover:opacity-50 cursor-pointer ' onClick={closeModal}/>
            </div>

            <div className="grid lg:md:grid-cols-2 sm:grid-cols-1 px-3">
                <div className="flex">
                    <label className="w-[4rem] flex items-center justify-center">Name: </label>
                    <input className="w-[13rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"  placeholder="User Name"></input>
                </div>
                <div className="flex">
                    <label className="w-[4rem] flex items-center justify-center">Email: </label>
                    <input className="w-[13rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"  placeholder="User Email"></input>
                </div>
                <div className="flex">
                    <label className="w-[4rem] flex items-center justify-center" >Phone: </label>
                    <input className="w-[13rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"  placeholder="Phone Number"></input>
                </div>
                <div className="flex">
                    <label className="w-[4rem] flex items-center justify-center" >Address: </label>
                    <input className="w-[13rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"  placeholder="User Address"></input>
                </div>
                <div className="flex">
                    <label className="w-[4rem] flex items-center justify-center" >Role: </label>
                    <select className="w-[13rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3">
                        <option>Select Role</option>
                        <option>User</option>
                        <option>Admin</option>
                    </select>
                </div>
            </div>

            <button className="mt-3 mx-5 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            
        </div>  
    </div>
    </>
)
}

export default Edit;