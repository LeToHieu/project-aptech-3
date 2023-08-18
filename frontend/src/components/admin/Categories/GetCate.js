import AddCate from "./AddCate";
import EditCate from "./EditCate";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
const GET_CATEGORY_URL = "Category";
const GetCate = () => {
  const [Category, SetCategory] = useState();
  const [Categories, SetCategories] = useState();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(GET_CATEGORY_URL, config);
      SetCategories(response.data.categories.sort((a, b) => b.id - a.id));
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

  const deleteCategory = async (event, id) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        GET_CATEGORY_URL + "/delete/" + id,
        config
      );
      if (response) {
        toast.success("Deleted category successfully!");
        getCategory();
      } else {
        toast.error("Cannot delete category!");
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
      selector: (row) => row.categoryName,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
            onClick={() => {
              setIsOpenEdit(true) || SetCategory(row);
            }}
          >
            Edit
          </button>
          <button
            onClick={(event) => deleteCategory(event, row.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
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
        <AddCate
          isOpen={isOpenAdd}
          closeModal={() => setIsOpenAdd(false)}
          getCategory={() => getCategory()}
        ></AddCate>
        <EditCate
          isOpen={isOpenEdit}
          closeModal={() => setIsOpenEdit(false)}
          Category={Category}
          getCategory={() => getCategory()}
        />
        <div className="my-2">
          <div className="text-xl float-left my-2 hover:bg-blue-700 font-bold">
            Categories Table
          </div>
          <button
            className="float-right my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpenAdd(true)}
          >
            Add Categories
          </button>
        </div>
        <DataTable
          columns={columns}
          data={Categories}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
        />
      </div>
    </>
  );
};

export default GetCate;
