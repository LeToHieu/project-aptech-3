import Header from "./Header";
import Sidebar from "./MySideBar";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AdminIndex = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[2];
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user.role !== 2 && location === "users") {
      navigate(-1);
    }
  }, [user?.role]);
  return (
    <div className="">
      <div className="flex">
        <div className="flex-1 h-[100vh] overflow-hidden">
          <Sidebar />
        </div>
        <div className="flex-[7] border h-[100vh] overflow-scroll">
          <Header />
          <div className="pb-[70px] "></div>
          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;
