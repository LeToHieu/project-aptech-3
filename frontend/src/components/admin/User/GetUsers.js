import AddUser from "./AddUsers";
import EditUsers from "./EditUsers";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";

const GET_USER_URL = "User";
const url = "https://localhost:7023/resources/";

const GetUsers = () => {
  const [Users, SetUsers] = useState();
  const [User, SetUser] = useState("");
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(GET_USER_URL, config);
      const sortedUsers = response.data.users
        .filter((user) => user.role !== 3)
        .sort((a, b) => b.role - a.role);
      SetUsers(sortedUsers);
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

  const deleteUsers = async (event, id) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(GET_USER_URL + "/delete/" + id, config);
      if (response) {
        toast.success("Deleted user successfully!");
        getUsers();
      } else {
        toast.error("Cannot delete user!");
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

  return (
    <>
      <div className="mx-5 p-5 rounded-lg border-solid border-2 border-indigo-600 my-5 min-h-screen">
        <AddUser
          isOpen={isOpenAdd}
          closeModal={() => setIsOpenAdd(false)}
          getUsers={() => getUsers()}
        ></AddUser>
        <EditUsers
          isOpen={isOpenEdit}
          closeModal={() => setIsOpenEdit(false)}
          getUsers={() => getUsers()}
          User={User}
        />
        <div className=" my-2">
          <div className="text-xl float-left my-2 hover:bg-blue-700 font-bold">
            Users Table
          </div>

          <button
            className="float-right my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpenAdd(true)}
          >
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
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Users !== undefined && Users !== "" && Users !== null ? (
              Users.map((user, index) => (
                <tr className="even:bg-gray-200 odd:bg-gray-100" key={user.id}>
                  <td className="mx-3 px-3">{index + 1}</td>
                  <td>{user.username}</td>
                  <td
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {user.email}
                  </td>
                  <td
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {user.phone}
                  </td>
                  <td>
                    <img
                      className="h-10 w-10"
                      src={url + user.userimage}
                      alt="..."
                    ></img>
                  </td>
                  <td>{user.role === 0 ? "User" : "Admin"}</td>
                  <td>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
                      onClick={() => {
                        setIsOpenEdit(true) || SetUser(user);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
                      onClick={(event) => deleteUsers(event, user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="even:bg-gray-200 odd:bg-gray-100">
                <td colSpan="7" className="py-3 text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetUsers;
