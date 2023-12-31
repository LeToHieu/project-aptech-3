import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogOut } from "../../redux/reducer/users";
const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(userLogOut());
  };

  const showProfile = () => {
    setOpen(!open);
  };

  return (
    <div className="">
      <div
        className="flex bg-white items-center justify-between h-[70px] shadow-lg px-[25px] fixed"
        style={{ width: "88%" }}
      >
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px]"></div>
          <div
            className="flex items-center gap-[15px] relative"
            onClick={showProfile}
          >
            <div className="h-[50px] w-[50px] rounded-full bg-[#4E73DF] cursor-pointer flex items-center justify-center relative z-40">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </div>
            <p>Douglas McGee</p>

            {open && (
              <div className="bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px]">
                <p className="cursor-pointer hover:text-[blue] font-semibold">
                  Profile
                </p>
                <p className="cursor-pointer hover:text-[blue] font-semibold">
                  Settings
                </p>
                <p
                  onClick={(event) => handleLogOut(event)}
                  className="cursor-pointer hover:text-[blue] font-semibold"
                >
                  Log out
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
