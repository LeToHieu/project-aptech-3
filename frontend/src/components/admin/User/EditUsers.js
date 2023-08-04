import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";

const EDIT_USER_URL = "User/edit/";
const url = "https://localhost:7023/resources/";
const Edit = ({ isOpen, closeModal, getUsers, User }) => {
  const initialUser = {
    Id: "",
    Username: "",
    Userimage: "",
    Phone: "",
    Password: "",
    Email: "",
    fileImage: "",
  };
  const [user, setUser] = useState(initialUser);
  useEffect(() => {
    setUser({
      Id: User.id ?? "",
      Username: User.username ?? "",
      Userimage: "",
      Phone: User.phone ?? "",
      Password: User.password ?? "",
      Email: User.email ?? "",
      fileImage: "",
    });
  }, [User]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    await Object.keys(user).forEach((key) => {
      if (key === "Userimage" && user[key] === "") {
        formData.append(key, ".");
      } else {
        formData.append(key, user[key]);
      }
    });

    const config = {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    };
    try {
      const response = await axios.post(
        EDIT_USER_URL + User.id,
        formData,
        config
      );
      if (response !== null) {
        toast.success("update user successfully!");
        getUsers();
        closeModal();
      } else {
        toast.error("Cannot update user!");
      }
    } catch (error) {
      if (!error?.response) {
        toast.error("No server response");
      } else if (error?.response.data.message) {
        toast.error(`${error?.response.data.message}`);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const chooseFile = async (event) => {
    event.preventDefault();
    const fileImage = event.target.files[0];
    const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (fileImage != null) {
      if (!allowedMimeTypes.includes(fileImage.type)) {
        toast.error("file not allowed, file must be image type");
        return;
      }
      const Userimage = URL.createObjectURL(fileImage);
      setUser({ ...user, fileImage, Userimage });
    } else {
      setUser({ ...user, fileImage: "", Userimage: "" });
    }
  };

  return (
    <>
      <div
        className={`modal ${
          isOpen ? "" : "hidden"
        }  place-content-center fixed z-10 inset-0 flex`}
        style={{
          backgroundColor: "gray",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="rounded-lg bg-white lg:w-[40rem] lg:h-[35rem] mt-5 overflow-y-auto">
          <div className="flex rounded-t-lg bg-slate-300 h-[2.25rem] items-center justify-between px-3">
            <div className="flex justify-end">Edit User</div>
            <CloseIcon
              className="justify-end float-right hover:opacity-50 cursor-pointer "
              onClick={closeModal}
            />
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="grid lg:md:grid-cols-2 sm:grid-cols-1 px-3">
              <div className="flex">
                <label className="w-[4rem] flex items-center justify-center">
                  Name:{" "}
                </label>
                <input
                  className="w-[13rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="User Name"
                  required
                  type="text"
                  value={user.Username}
                  onChange={(e) =>
                    setUser({ ...user, Username: e.target.value })
                  }
                ></input>
              </div>
              <div className="flex">
                <label className="w-[4rem] flex items-center justify-center">
                  Email:{" "}
                </label>
                <input
                  className="w-[13rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="User Email"
                  required
                  type="text"
                  value={user.Email}
                  onChange={(e) => setUser({ ...user, Email: e.target.value })}
                ></input>
              </div>
              <div className="flex">
                <label className="w-[4rem] flex items-center justify-center">
                  Phone:{" "}
                </label>
                <input
                  className="w-[13rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="Phone Number"
                  required
                  type="text"
                  value={user.Phone}
                  onChange={(e) => setUser({ ...user, Phone: e.target.value })}
                ></input>
              </div>

              <div className="flex">
                <label className="w-[4rem] flex items-center justify-center">
                  Password:{" "}
                </label>
                <input
                  className="w-[13rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="Password"
                  value={user.Password}
                  required
                  type="password"
                  onChange={(e) =>
                    setUser({ ...user, Password: e.target.value })
                  }
                ></input>
              </div>

              <div className="flex h-[3rem]">
                <label className="w-[4rem] flex items-center justify-center">
                  Image:{" "}
                </label>
                <input
                  accept="image/*"
                  type="file"
                  className="text-sm w-[13rem] h-[2rem] m-3"
                  placeholder="Input image"
                  onChange={(event) => chooseFile(event)}
                ></input>
              </div>

              {user.Userimage === "" &&
                User.userimage &&
                User.userimage !== "." &&
                User.userimage !== "string" && (
                  <div className="flex pb-5">
                    <label className="w-[4rem] flex items-center justify-center">
                      Old Image:{" "}
                    </label>
                    <img
                      src={url + User.userimage}
                      alt="..."
                      className="w-[13rem] h-[10rem] m-3"
                    />
                  </div>
                )}

              {user.Userimage && (
                <div className="flex pb-5">
                  <label className="w-[4rem] flex items-center justify-center">
                    New Image:{" "}
                  </label>
                  <img
                    src={user.Userimage}
                    alt="..."
                    className="w-[13rem] h-[10rem] m-3"
                  />
                </div>
              )}
            </div>

            <button className="mt-3 mx-5 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
