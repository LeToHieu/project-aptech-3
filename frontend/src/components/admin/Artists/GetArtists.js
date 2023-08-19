import { useState, useEffect } from "react";
import AddArtist from "./AddArtist";
import EditArtist from "./EditArtist";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import DataTable from "react-data-table-component";
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
      SetArtists(response.data.artists.sort((a, b) => b.id - a.id));
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

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.artistName,
    },
    {
      name: "Image",
      selector: (row) => (
        <img className="h-10 w-10" src={url + row.artistImage} alt="..."></img>
      ),
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
              setIsOpenEdit(true) || SetArtist(row);
            }}
          >
            Edit
          </button>
          <button
            onClick={(event) => DeleteArtit(event, row.id)}
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
        <AddArtist
          isOpen={isOpenAdd}
          closeModal={() => setIsOpenAdd(false)}
          GetArtists={() => GetArtists()}
        ></AddArtist>
        <EditArtist
          isOpen={isOpenEdit}
          closeModal={() => setIsOpenEdit(false)}
          GetArtists={() => GetArtists()}
          SetMyArtistToNull={() => SetArtist({})}
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
        <DataTable
          columns={columns}
          data={Artists}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
        />
      </div>
    </>
  );
};

export default GetArtists;