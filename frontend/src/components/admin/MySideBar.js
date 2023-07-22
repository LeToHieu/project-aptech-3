import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReorderIcon from '@mui/icons-material/Reorder';
import ReportIcon from '@mui/icons-material/Report';
import FeedIcon from '@mui/icons-material/Feed';
import GradeIcon from '@mui/icons-material/Grade';
const SideBar = () => {
  const location = useLocation().pathname.split("/")[2];
  console.log(location);
  return (
    <>
      <div className="bg-[#4E73DF] basis-[12%] flex overflow-scroll">
        <div className="px-[25px] h-screen h-[100vh]">
          <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
            <h1 className="text-white text-[20px] leading-[24px] font-extrabold cursor-pointer">
              Admin panel
            </h1>
          </div>
          <Link
            to=""
            className={`${
              location === undefined ? "font-bold" : "hover:font-bold"
            } flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer`}
          >
            <DashboardIcon style={{ color: "white" }} />
            <p className="text-[14px] leading-[20px] text-white">Dashboard</p>
          </Link>

          <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
            <div
              className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer`}
            >
              <Link
                to="users"
                className={`${
                  location === "users" ? "font-bold" : "hover:font-bold"
                } flex items-center gap-[10px]`}
              >
                <PeopleAltIcon style={{ color: "white" }} />
                <p className={`text-[14px]  leading-[20px] text-white`}>
                  Users
                </p>
              </Link>
            </div>
          </div>

          <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
              <Link
                to="categories"
                className={`${
                  location === "categories" ? "font-bold" : "hover:font-bold"
                } flex items-center gap-[10px]`}
              >
                <CategoryIcon style={{ color: "white" }} />
                <p className="text-[14px] leading-[20px] text-white">
                  Categories
                </p>
              </Link>
            </div>
          </div>

          <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
              <Link
                to="artists"
                className={`${
                  location === "artists" ? "font-bold" : "hover:font-bold"
                } flex items-center gap-[10px]`}
              >
                <ContactsRoundedIcon style={{ color: "white" }} />
                <p className="text-[14px] leading-[20px] text-white">Artists</p>
              </Link>
            </div>
          </div>

          <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
              <Link
                to="albums"
                className={`${
                  location === "albums" ? "font-bold" : "hover:font-bold"
                } flex items-center gap-[10px]`}
              >
                <LibraryAddOutlinedIcon style={{ color: "white" }} />
                <p className="text-[14px] leading-[20px] text-white">Albums</p>
              </Link>
            </div>
          </div>

          <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
              <Link
                to="medias"
                className={`${
                  location === "medias" ? "font-bold" : "hover:font-bold"
                } flex items-center gap-[10px]`}
              >
                <NotStartedOutlinedIcon style={{ color: "white" }} />
                <p className="text-[14px] leading-[20px] text-white">Medias</p>
              </Link>
            </div>
          </div>

          <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
              <Link
                to="permisson"
                className={`${
                  location === "permisson" ? "font-bold" : "hover:font-bold"
                } flex items-center gap-[10px]`}
              >
                <PermIdentityIcon style={{ color: "white" }} />
                <p className="text-[14px] leading-[20px] text-white">Permission</p>
              </Link>
            </div>
          </div>

          <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
              <Link
                to="bill"
                className={`${
                  location === "bill" ? "font-bold" : "hover:font-bold"
                } flex items-center gap-[10px]`}
              >
                <RequestQuoteIcon style={{ color: "white" }} />
                <p className="text-[14px] leading-[20px] text-white">Bills</p>
              </Link>
            </div>
          </div>

          <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
              <Link
                to="order"
                className={`${
                  location === "order" ? "font-bold" : "hover:font-bold"
                } flex items-center gap-[10px]`}
              >
                <ReorderIcon style={{ color: "white" }} />
                <p className="text-[14px] leading-[20px] text-white">Orders</p>
              </Link>
            </div>
          </div>
        
          <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
              <Link
                to="report"
                className={`${
                  location === "report" ? "font-bold" : "hover:font-bold"
                } flex items-center gap-[10px]`}
              >
                <ReportIcon style={{ color: "white" }} />
                <p className="text-[14px] leading-[20px] text-white">Reports</p>
              </Link>
            </div>
          </div>

          <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
              <Link
                to="news"
                className={`${
                  location === "news" ? "font-bold" : "hover:font-bold"
                } flex items-center gap-[10px]`}
              >
                <FeedIcon style={{ color: "white" }} />
                <p className="text-[14px] leading-[20px] text-white">News</p>
              </Link>
            </div>
          </div>

          <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
              <Link
                to="rating"
                className={`${
                  location === "rating" ? "font-bold" : "hover:font-bold"
                } flex items-center gap-[10px]`}
              >
                <GradeIcon style={{ color: "white" }} />
                <p className="text-[14px] leading-[20px] text-white">Rating</p>
              </Link>
            </div>
          </div>
          <div className="pt-[15px]">
            <div className="flex items-center justify-center">
              <div className="h-[40px] w-[40px] bg-[#3C5EC1] rounded-full flex items-center justify-center cursor-pointer">
                {/* <FaChevronLeft color='white' /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
