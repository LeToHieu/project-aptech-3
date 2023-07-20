import Search from "./Search";
import Sidebar from "./MySideBar";
import { Outlet } from "react-router-dom";

const AdminIndex = ()=>{
    return(
        <div className="">
      <div className="flex">
        <div className="flex-1 h-[100vh] overflow-hidden">
          <Sidebar />
        </div>
        <div className="flex-[7] border h-[100vh] overflow-scroll">
          <Search />
          <div className="pb-[70px] "></div>
          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
    )
}

export default AdminIndex;