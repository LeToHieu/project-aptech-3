import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const GET_ARTIST_BY_ID = "Artist/";
const ADD_ARTIST_URL = "/Album/add";
const ADD_ARTIST_ALBUM_URL = "/ArtistAlbum/add";
const INITIAL_STATE = {
  albumName: "",
  price: "",
  description: "",
};

const AddAlbum = ({ isOpen, closeModal, GetAlbums }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [Artists, setArtists] = useState([]);
  const [Album, setAlbum] = useState(INITIAL_STATE);

  const handleDeleteArtist = (index) => {
    setArtists((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleGetArtistById = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const du_lieu = await axios.get(GET_ARTIST_BY_ID + id, config);
      const artistExists = Artists.some(
        (artist) => artist.id === du_lieu.data.artist.id
      );
      if (artistExists) {
        toast.error("Artist have added in!");
        return;
      }
      await setArtists((prevArtists) =>
        [...prevArtists, du_lieu.data.artist].sort((a, b) => a.id - b.id)
      );
      toast.success("Artist added successfully!");
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      toast.error("Please fill add user by id field!");
      return;
    }

    handleGetArtistById(searchTerm);
    setSearchTerm("");
  };

  const validateFields = (album) => {
    if (!(1 <= album.albumName.length && album.albumName.length <= 255)) {
      toast.error("Album name must have 1 to 255 characters");
      return false;
    }

    const parsedPrice = parseFloat(album.price);
    if (isNaN(parsedPrice) || parsedPrice < 0 || parsedPrice > 1000000000) {
      toast.error("Price must be a number between 0 and 1000000000");
      return false;
    }

    if (!(1 <= album.description.length && album.description.length <= 255)) {
      toast.error("Description must have 1 to 255 characters");
      return false;
    }

    return true;
  };

  const handleAddAlbum = async (myAlbum) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    var response = "";

    try {
      response = await axios.post(ADD_ARTIST_URL, myAlbum, config);
      if (response !== null) {
        toast.success("add album successfully!");
        //getUsers();
        //setUser({ ...initialUser });
        //closeModal();
      } else {
        toast.error("Cannot add album!");
      }
    } catch (error) {
      if (!error?.response) {
        toast.error("No server response1");
      } else if (error?.response.data.message) {
        toast.error(`${error?.response.data.message}`);
      } else {
        toast.error("Something went wrong!");
      }
    }
    if (response !== null && response !== "") {
      return response?.data?.newAlbum?.id;
    } else {
      return false;
    }
  };

  const handleAddArtitstAlbum = async (artistAlbum) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    var response = "";

    try {
      response = await axios.post(ADD_ARTIST_ALBUM_URL, artistAlbum, config);
      if (response === null) {
        toast.error("Cannot add artist!");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const parsedPrice = await parseFloat(Album.price);
    await setAlbum({ ...Album, price: parsedPrice });
    var myAlbum = await Album;

    if (!validateFields(myAlbum)) {
      return;
    }

    if (Artists.length === 0) {
      toast.error("Please add artist to album");
      return;
    }

    const albumId = await handleAddAlbum(myAlbum);
    if (albumId !== false) {
      await Promise.all(
        Artists.map(async (artist, index) => {
          const myArtist = { albumId, artistId: artist.id };
          await handleAddArtitstAlbum(myArtist);
        })
      );
      GetAlbums();
      setAlbum(INITIAL_STATE);
      setArtists([]);
      closeModal();
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
        <div className="rounded-lg bg-white lg:w-[40rem] h-[25rem] min-h-[35rem] mt-5 pb-5 overflow-y-auto">
          <div className="flex rounded-t-lg bg-slate-300 h-[2.25rem] items-center justify-between px-3">
            <div className="text-xl float-left my-2 hover:bg-blue-700 font-bold">
              Artists Table
            </div>
            <div className="flex justify-end">Add Album</div>
            <CloseIcon
              className="justify-end float-right hover:opacity-50 cursor-pointer"
              onClick={() => {
                closeModal() || setArtists([]) || setAlbum(INITIAL_STATE);
              }}
            />
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="px-2 grid lg:md:grid-cols-2 sm:grid-cols-1">
              <div className="flex">
                <label className="flex lg:w-[9rem] sm:w-[4rem] justify-start items-center">
                  Name:{" "}
                </label>
                <input
                  className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="Album Name"
                  value={Album.albumName}
                  onChange={(e) =>
                    setAlbum({ ...Album, albumName: e.target.value })
                  }
                ></input>
              </div>
              <div className="flex">
                <label className="flex lg:w-[2rem] sm:w-[4rem]  justify-start items-center">
                  Price:{" "}
                </label>
                <input
                  className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="Album's Price"
                  type="number"
                  step="0.01"
                  value={Album.price}
                  onChange={(e) =>
                    setAlbum({ ...Album, price: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <div className="flex px-2">
              <label className=" flex w-[7rem] pt-3 justify-start">
                Description:{" "}
              </label>
              <textarea
                className="w-[80%] h-[8rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                placeholder="Artist Description"
                value={Album.description}
                onChange={(e) =>
                  setAlbum({ ...Album, description: e.target.value })
                }
              ></textarea>
            </div>

            <div className="flex px-2 items-center">
              <label className=" flex w-[7rem] pt-3 justify-start">
                Add Artist By Id:{" "}
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => handleSearch(e)}
              >
                Search
              </button>
            </div>

            <div className="mt-4 mx-5 min-h-[5rem] max-h-[10rem] overflow-y-auto border">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left border">Artist Id</th>
                    <th className="py-2 px-4 text-left border">Artist Name</th>
                    <th className="py-2 px-4 text-left border">Artist Image</th>
                    <th className="py-2 px-4 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Artists.length !== 0 ? (
                    Artists.map((artist, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4 border">{artist.id}</td>
                        <td className="py-2 px-4 border">
                          {artist.artistName}
                        </td>
                        <td className="py-2 px-4 border">
                          {artist.artistImage}
                        </td>
                        <td className="py-2 px-4 border">
                          <button
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                            onClick={() => handleDeleteArtist(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="even:bg-gray-200 odd:bg-gray-100">
                      <td colSpan="4" className="py-3 text-center">
                        There is no artist added
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button className="mt-3 mx-5 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAlbum;
