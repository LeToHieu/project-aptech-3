import React from "react";
import CloseIcon from "@mui/icons-material/Close";
function Cart({ isOpen, closeModal }) {
  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        id="section2"
        className="p-8 mt-6 lg:mt-0 rounded shadow bg-white relative"
      >
        <CloseIcon
          className="absolute top-2 right-2 hover:opacity-50 cursor-pointer"
          onClick={closeModal}
        />

        <form>
          <div className="md:flex mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                for="my-textfield"
              >
                Text Field
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="form-input block w-full focus:bg-white"
                id="my-textfield"
                type="text"
                value=""
              />
            </div>
          </div>

          <div className="md:flex mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                for="my-textarea"
              >
                Text Area
              </label>
            </div>
            <div class="md:w-2/3">
              <textarea
                class="form-textarea block w-full focus:bg-white"
                id="my-textarea"
                value=""
                rows="8"
              ></textarea>
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cart;
