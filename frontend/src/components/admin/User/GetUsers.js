import AddUser from "./AddUsers";
import EditUsers from "./EditUsers";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
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

  console.log(Users);

  const getUsers = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(GET_USER_URL, config);
      const sortedUsers = response.data.users
        .filter((user) => user.role !== 2)
        .sort((a, b) => b.id - a.id)
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

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.username,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
    },
    {
      name: "Image",
      selector: (row) => (
        <img className="h-10 w-10" src={url + row.userimage} alt="..."></img>
      ),
    },

    {
      name: "Role",
      selector: (row) => (row.role === 0 ? "User" : "Admin"),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
            onClick={() => {
              setIsOpenEdit(true) || SetUser(row);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
            onClick={(event) => deleteUsers(event, row.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

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
          SetUserToNull={() => SetUser({})}
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

        <DataTable
          columns={columns}
          data={Users}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
        />
      </div>
    </>
  );
};

export default GetUsers;