import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  return (
    <>
      <section class="h-100" style={{ overflowY: "auto", minHeight: "100vh" }}>
        <div class="container h-100 py-5">
          <div class="flex justify-center items-center h-100">
            <div class="w-10/12">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-normal mb-0 text-black text-xl">Shopping Cart</h3>
              </div>

              <div class="bg-white rounded-lg mb-4" style={{ maxHeight: "calc(100vh - 10rem)" }}>
                <div class="p-4">
                  <div class="flex justify-between items-center">
                    <div class="w-2/5">
                      <p class="font-semibold text-lg mb-2">Basic T-shirt</p>
                      <p class="text-gray-600">Size: M Color: Grey</p>
                    </div>
                    <div class="w-1/5">
                      <h5 class="mb-0 font-semibold">$499.00</h5>
                    </div>
                    <div class="w-1/12 text-end">
                      <button className="text-danger focus:outline-none">
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg">
                <div class="p-4">
                  <button type="button" class="bg-blue-500 text-white py-4 px-8 block w-full text-lg rounded-lg">
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
