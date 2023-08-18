import AddCate from "./AddCate";
import EditCate from "./EditCate";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";

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
      SetCategories(response.data.categories);
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
        <table className=" table-fixed rounded-lg lg:table-auto w-full border-solid border-2 border-collapse border border-slate-400">
          <thead>
            <tr className="text-left bg-gray-300">
              <th className="mx-3 px-3 w-[2rem]">Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Categories !== undefined &&
            Categories !== "" &&
            Categories !== null ? (
              Categories.map((category, index) => (
                <tr
                  className="even:bg-gray-200 odd:bg-gray-100"
                  key={category.id}
                >
                  <td className="mx-3 px-3">{index + 1}</td>
                  <td>{category.categoryName}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
                      onClick={() => {
                        setIsOpenEdit(true) || SetCategory(category);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={(event) => deleteCategory(event, category.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="even:bg-gray-200 odd:bg-gray-100">
                <td colSpan="4" className="py-3 text-center">
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

export default GetCate;
