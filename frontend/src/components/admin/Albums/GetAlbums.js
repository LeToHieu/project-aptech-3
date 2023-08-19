import { useState, useEffect } from "react";
import AddAlbum from "./AddAlbum";
import EditAlbum from "./EditAlbum";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import parseJson from "../../../Parse";
import DataTable from "react-data-table-component";

const GET_ALBUM_URL = "Album";
const ARTIST_ALBUM_URL = "ArtistAlbum";
const GetAlbums = () => {
  const [Albums, setAlbums] = useState([]);
  const [Album, setAlbum] = useState([]);
  const [Artists, setArtists] = useState([]);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const fetchData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const du_lieu = await axios.get(GET_ALBUM_URL, config);
      console.log(parseJson(du_lieu.data.json))
      setAlbums(parseJson(du_lieu.data.json)?.sort((a, b) => b.Id - a.Id));
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteArtistAlbum = async (event, deleteArtists) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(ARTIST_ALBUM_URL + "/delete/", deleteArtists, config);
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

  const handleDeleteAlbum = async (event, id) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        GET_ALBUM_URL + "/delete/" + id,
        config
      );
      if (response) {
        toast.success("Deleted album successfully!");
      } else {
        toast.error("Cannot delete album category!");
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

  const handleDeleteAA = async (event, deleteArtists, id) => {
    event.preventDefault();

    try {
      await Promise.all(
        deleteArtists.map(async (artist, index) => {
          const myArtist = {
            albumId: artist.AlbumId,
            artistId: artist.ArtistId,
          };
          await handleDeleteArtistAlbum(event, myArtist);
        })
      );
      await handleDeleteAlbum(event, id);
      fetchData();
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
      selector: (row) => row.Id,
    },
    {
      name: "Name",
      selector: (row) => row.AlbumName,
    },
    {
      name: "Price",
      selector: (row) => row.Price + " $",
    },
    {
      name: "Artists",
      selector: (row) =>
        row.Artists.map((artist, index) => (
          <p key={index}>{artist.Artist.ArtistName}</p>
        )),
    },
    {
      name: "Description",
      selector: (row) => row.Description,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
            onClick={() => {
              setAlbum(row) || setArtists(row.Artists) || setIsOpenEdit(true);
            }}
          >
            Edit
          </button>
          <button
            onClick={(event) => handleDeleteAA(event, row.Artists, row.Id)}
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
        <AddAlbum
          isOpen={isOpenAdd}
          closeModal={() => setIsOpenAdd(false)}
          GetAlbums={() => fetchData()}
        ></AddAlbum>
        <EditAlbum
          isOpen={isOpenEdit}
          closeModal={() => setIsOpenEdit(false)}
          GetAlbums={() => fetchData()}
          setMyArtistsToNull={() => setArtists([])}
          setMyAlbumToNull={() => setArtists("")}
          handleDeleteArtistAlbum={(event, deleteArtist) =>
            handleDeleteArtistAlbum(event, deleteArtist)
          }
          Album={Album}
          Artists={Artists}
        />
        <div className="my-2">
          <div className="text-xl float-left my-2 hover:bg-blue-700 font-bold">
            Albums Table
          </div>
          <button
            className="float-right my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpenAdd(true)}
          >
            Add Album
          </button>
        </div>
        <DataTable
          columns={columns}
          data={Albums}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
        />
      </div>
    </>
  );
};

export default GetAlbums;