import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";

const EDIT_CATE_URL = "Category/edit/";
const EditCate = ({ isOpen, closeModal, Category, getCategory }) => {
  const initialCate = {
    id: "",
    categoryName: "",
    description: "",
  };
  const [category, setCategory] = useState(initialCate);

  useEffect(() => {
    setCategory(Category ?? initialCate);
  }, [Category]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        EDIT_CATE_URL + Category.id,
        category,
        config
      );
      if (response !== null) {
        toast.success("update user successfully!");
        getCategory();
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
        <div className="rounded-lg bg-white lg:min-w-[40rem] h-[20rem] min-h-[4rem] mt-5">
          <div className="flex rounded-t-lg bg-slate-300 h-[2.25rem] items-center justify-between px-3">
            <div className="flex justify-end">Edit Categories</div>
            <CloseIcon
              className="justify-end float-right hover:opacity-50 cursor-pointer"
              onClick={closeModal}
            />
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="">
              <div className="flex px-2">
                <label className="flex w-[7rem] justify-start items-center">
                  Name:{" "}
                </label>
                <input
                  className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="Categories Name"
                  required
                  maxLength="255"
                  type="text"
                  value={category.categoryName}
                  onChange={(e) =>
                    setCategory({ ...category, categoryName: e.target.value })
                  }
                ></input>
              </div>
              <div className="flex px-2">
                <label className=" flex w-[7rem] pt-3 justify-start">
                  Description:{" "}
                </label>
                <textarea
                  className="w-[80%] h-[8rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="Categories Description"
                  required
                  maxLength="255"
                  type="text"
                  value={category.description}
                  onChange={(e) =>
                    setCategory({ ...category, description: e.target.value })
                  }
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="mt-3 mx-5 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCate;
