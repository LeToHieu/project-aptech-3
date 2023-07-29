import { useState } from "react";
import AddCate from "./AddCate";
import EditCate from "./EditCate";

const GetCate = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <>
      <div className="mx-5 p-5 rounded-lg border-solid border-2 border-indigo-600 my-5 min-h-screen">
        <AddCate
          isOpen={isOpenAdd}
          closeModal={() => setIsOpenAdd(false)}
        ></AddCate>
        <EditCate isOpen={isOpenEdit} closeModal={() => setIsOpenEdit(false)} />
        <div className="float-right my-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
            <tr className="even:bg-gray-200 odd:bg-gray-100">
              <td className="mx-3 px-3">1</td>
              <td>Nhac Phim</td>
              <td>
                "But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master-builder
                of human happiness. No one rejects, dislikes, or avoids pleasure
                itself, because it is pleasure, but because those who do not
                know how to pursue pleasure rationally encounter consequences
                that are extremely painful. Nor again is there anyone who loves
                or pursues or desires to obtain pain of itself, because it is
                pain, but because occasionally circumstances occur in which toil
                and pain can procure him some great pleasure. To take a trivial
                example, which of us ever undertakes laborious physical
                exercise, except to obtain some advantage from it? But who has
                any right to find fault with a man who chooses to enjoy a
                pleasure that has no annoying consequences, or one who avoids a
                pain that produces no resultant pleasure?"
              </td>
              <td>
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
    </>
  );
};

export default GetCate;
