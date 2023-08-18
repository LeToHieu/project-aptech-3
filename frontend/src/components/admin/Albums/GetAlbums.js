import { useState, useEffect } from "react";
import AddAlbum from "./AddAlbum";
import EditAlbum from "./EditAlbum";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import parseJson from "../../../Parse";

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
      setAlbums(parseJson(du_lieu.data.json));
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
        <div className="float-right my-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpenAdd(true)}
          >
            Add Album
          </button>
        </div>
        <table className=" table-fixed rounded-lg lg:table-auto w-full border-solid border-2 border-collapse border border-slate-400">
          <thead>
            <tr className="text-left bg-gray-300">
              <th className="mx-3 px-3 w-[2rem]">Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Artists</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Albums.length !== 0 ? (
              Albums.map((album, index) => (
                <tr className="even:bg-gray-200 odd:bg-gray-100" key={album.Id}>
                  <td className="mx-3 px-3">{album.Id}</td>
                  <td>{album.AlbumName}</td>
                  <td>{album.Price} $</td>
                  <td>
                    {album.Artists.map((artist, index) => (
                      <p key={index}>{artist.Artist.ArtistName}</p>
                    ))}
                  </td>

                  <td>{album.Description}</td>
                  <td>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
                      onClick={() => {
                        setAlbum(album) ||
                          setArtists(album.Artists) ||
                          setIsOpenEdit(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={(event) =>
                        handleDeleteAA(event, album.Artists, album.Id)
                      }
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="even:bg-gray-200 odd:bg-gray-100">
                <td colSpan="6" className="py-3 text-center">
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

export default GetAlbums;
