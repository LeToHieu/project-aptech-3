import { useState, useEffect } from "react";
import AddArtist from "./AddArtist";
import EditArtist from "./EditArtist";
import { toast } from "react-toastify";
import axios from "../../../api/axios";

const ARTIST_URL = "Artist";
const url = "https://localhost:7023/resources/";
const GetArtists = () => {
  const initialArtist = {
    Id: "",
    ArtistName: "",
    ArtistImage: "",
    Description: "",
    file: "",
  };
  const [Artists, SetArtists] = useState();
  const [Artist, SetArtist] = useState(initialArtist);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  useEffect(() => {
    GetArtists();
  }, []);

  const GetArtists = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log("ahahaa");
      const response = await axios.get(ARTIST_URL, config);
      SetArtists(response.data.artists);
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

  const DeleteArtit = async (event, id) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(ARTIST_URL + "/delete/" + id, config);
      if (response) {
        toast.success("Deleted category successfully!");
        GetArtists();
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
        <AddArtist
          isOpen={isOpenAdd}
          closeModal={() => setIsOpenAdd(false)}
          GetArtists={() => GetArtists()}
        ></AddArtist>
        <EditArtist
          isOpen={isOpenEdit}
          closeModal={() => setIsOpenEdit(false)}
          GetArtists={() => GetArtists()}
          Artist={Artist}
        />
        <div className="my-2">
          <div className="text-xl float-left my-2 hover:bg-blue-700 font-bold">
            Artists Table
          </div>

          <button
            className="float-right my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpenAdd(true)}
          >
            Add Artists
          </button>
        </div>
        <table className=" table-fixed rounded-lg lg:table-auto w-full border-solid border-2 border-collapse border border-slate-400">
          <thead>
            <tr className="text-left bg-gray-300">
              <th className="mx-3 px-3 w-[2rem]">Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Artists !== undefined && Artists !== "" && Artists !== null ? (
              Artists.map((artitst, index) => (
                <tr
                  className="even:bg-gray-200 odd:bg-gray-100"
                  key={artitst.id}
                >
                  <td className="mx-3 px-3">{artitst.id}</td>
                  <td>{artitst.artistName}</td>

                  <td>
                    <img
                      className="h-10 w-10"
                      src={url + artitst.artistImage}
                      alt="..."
                    ></img>
                  </td>
                  <td>{artitst.description}</td>
                  <td>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
                      onClick={() => {
                        setIsOpenEdit(true) || SetArtist(artitst);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={(event) => DeleteArtit(event, artitst.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="even:bg-gray-200 odd:bg-gray-100">
                <td colSpan="5" className="py-3 text-center">
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

export default GetArtists;
