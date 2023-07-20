import CloseIcon from '@mui/icons-material/Close';

const EditAlbum = ({isOpen, closeModal})=>{
return(
    
    <>
        <div className={`modal ${isOpen ? "" : "hidden"}  place-content-center fixed z-10 inset-0 flex`} style={{backgroundColor: "gray", width: "100%", height: "100%", background:"rgba(0,0,0,0.5)"}}>
            <div className="rounded-lg bg-white lg:min-w-[40rem] h-[25rem] min-h-[4rem] mt-5">
                <div className="flex rounded-t-lg bg-slate-300 h-[2.25rem] items-center justify-between px-3">
                    <div className='flex justify-end'>
                        Edit Album
                    </div>
                    <CloseIcon className='justify-end float-right hover:opacity-50 cursor-pointer' onClick={closeModal}/>
                </div>

                <div className="px-2 grid lg:md:grid-cols-2 sm:grid-cols-1">
                    <div className="flex">
                        <label className="flex lg:w-[9rem] sm:w-[4rem] justify-start items-center">Name: </label>
                        <input className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"  placeholder="Album's Name"></input>
                    </div>
                    <div className="flex">
                        <label className="flex lg:w-[2rem] sm:w-[4rem] justify-start items-center">Price: </label>
                        <input className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"  placeholder="Album's Price"></input>
                    </div>
                </div>
                <div className="flex px-2">
                    <label className=" flex w-[7rem] pt-3 justify-start">Description: </label>
                    <textarea className="w-[80%] h-[8rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"  placeholder="Artist Description"></textarea>
                </div>

                <button className="mt-3 mx-5 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                
            </div>  
        </div>
    </>
    )
}

export default EditAlbum;