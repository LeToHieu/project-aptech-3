import React from "react";
import CloseIcon from "@mui/icons-material/Close";
function Cart() {
  return (
    <>
      <section class="h-100 bg-gray-200">
        <div class="container h-100 py-5">
          <div class="flex justify-center items-center h-100">
            <div class="w-10/12">

              <div class="flex justify-between items-center mb-4">
                <h3 class="font-normal mb-0 text-black text-xl">Shopping Cart</h3>
                <div>
                  <p class="mb-0 text-gray-600">Sort by: <a href="#!" class="text-black">price <i
                    class="fas fa-angle-down mt-1"></i></a></p>
                </div>
              </div>

              <div class="bg-white rounded-lg mb-4">
                <div class="p-4">
                  <div class="flex justify-between items-center">
                    <div class="w-1/5">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                        class="w-full rounded-lg" alt="Cotton T-shirt" />
                    </div>
                    <div class="w-2/5">
                      <p class="font-semibold text-lg mb-2">Basic T-shirt</p>
                      <p class="text-gray-600">Size: M Color: Grey</p>
                    </div>
                    <div class="w-1/5 flex items-center">
                      <button class="px-2 py-1 text-gray-500"
                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                        <i class="fas fa-minus"></i>
                      </button>

                      <input id="form1" min="0" name="quantity" type="number"
                        class="w-16 text-center text-sm border border-gray-300" />

                      <button class="px-2 py-1 text-gray-500"
                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div class="w-1/5">
                      <h5 class="mb-0 font-semibold">$499.00</h5>
                    </div>
                    <div class="w-1/12 text-end">
                      <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-lg mb-4">
                <div class="p-4">
                  <div class="flex justify-between items-center">
                    <div class="w-1/5">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                        class="w-full rounded-lg" alt="Cotton T-shirt" />
                    </div>
                    <div class="w-2/5">
                      <p class="font-semibold text-lg mb-2">Basic T-shirt</p>
                      <p class="text-gray-600">Size: M Color: Grey</p>
                    </div>
                    <div class="w-1/5 flex items-center">
                      <button class="px-2 py-1 text-gray-500"
                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                        <i class="fas fa-minus"></i>
                      </button>

                      <input id="form1" min="0" name="quantity" value="2" type="number"
                        class="w-16 text-center text-sm border border-gray-300" />

                      <button class="px-2 py-1 text-gray-500"
                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div class="w-1/5">
                      <h5 class="mb-0 font-semibold">$499.00</h5>
                    </div>
                    <div class="w-1/12 text-end">
                      <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg">
                <div class="p-4">
                  <button type="button" class="bg-blue-500 text-white py-4 px-8 block w-full text-lg rounded-lg">Proceed to Pay</button>
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
