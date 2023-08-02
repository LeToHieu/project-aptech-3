import React, { Fragment, useRef, useState } from 'react';
import { Card, Typography } from '@material-tailwind/react';

function Table({ setIsOpenAdd, setIsOpenEdit, columns, propData, title }) {
  const data = React.useMemo(() => propData);
  return (
    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded z-100">
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-base text-blueGray-700">
              {title}
            </h3>
          </div>
          <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <button
              class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setIsOpenAdd(true)}
            >
              Thêm hoá đơn
            </button>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        <table class="items-center bg-transparent w-full border-collapse ">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  {column.Header}
                </th>
              ))}
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                
              </th>
              <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
                  onClick={() => setIsOpenEdit(true)}
                >
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 me-2 my-1 px-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
