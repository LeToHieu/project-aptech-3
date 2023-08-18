import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { Category } from "@mui/icons-material";

const EDIT_ARTIST_URL = "Artist/edit/";
const url = "https://localhost:7023/resources/";
const EditArtist = ({ isOpen, closeModal, GetArtists, Artist }) => {
  const initialArtist = {
    Id: "",
    ArtistName: "",
    ArtistImage: "",
    Description: "",
    file: "",
  };
  const [artist, setArtist] = useState(initialArtist);
  useEffect(() => {
    setArtist({
      Id: Artist.id ?? "",
      ArtistName: Artist.artistName ?? "",
      ArtistImage: "",
      Description: Artist.description ?? "",
      file: "",
    });
  }, [Artist]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    await Object.keys(artist).forEach((key) => {
      if (key === "ArtistImage" && artist[key] === "") {
        formData.append(key, ".");
      } else {
        formData.append(key, artist[key]);
      }
    });

    const config = {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    };
    try {
      const response = await axios.post(
        EDIT_ARTIST_URL + Artist.id,
        formData,
        config
      );
      if (response !== null) {
        toast.success("update user successfully!");
        GetArtists();
        closeModal();
      } else {
        toast.error("Cannot update user!");
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

  const chooseFile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (file != null) {
      if (!allowedMimeTypes.includes(file.type)) {
        toast.error("file not allowed, file must be image type");
        return;
      }
      const ArtistImage = URL.createObjectURL(file);
      setArtist({ ...artist, file, ArtistImage });
    } else {
      setArtist({ ...artist, file: "", ArtistImage: "" });
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
        <div className="rounded-lg bg-white lg:min-w-[40rem] h-[35rem] min-h-[4rem] mt-5 overflow-y-auto">
          <div className="flex rounded-t-lg bg-slate-300 h-[2.25rem] items-center justify-between px-3">
            <div className="flex justify-end">Edit Artist</div>
            <CloseIcon
              className="justify-end float-right hover:opacity-50 cursor-pointer"
              onClick={() => {
                closeModal() || setArtist(initialArtist);
              }}
            />
          </div>

          <form action="#" onSubmit={handleSubmit}>
            <div className="">
              <div className="flex px-2">
                <label className="flex w-[7rem] justify-start items-center">
                  Name:{" "}
                </label>
                <input
                  className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="Artist Name"
                  required
                  type="text"
                  value={artist.ArtistName}
                  onChange={(e) =>
                    setArtist({ ...artist, ArtistName: e.target.value })
                  }
                ></input>
              </div>
              <div className="flex px-2">
                <label className=" flex w-[7rem] pt-3 justify-start">
                  Description:{" "}
                </label>
                <textarea
                  className="w-[80%] h-[8rem] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="Artist Description"
                  required
                  type="text"
                  value={artist.Description}
                  onChange={(e) =>
                    setArtist({ ...artist, Description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="flex px-2">
                <label className="w-[7rem] flex items-center">Image: </label>
                <input
                  accept="image/*"
                  type="file"
                  className="text-sm w-[13rem] h-[2rem] m-3"
                  placeholder="Input image"
                  onChange={(event) => chooseFile(event)}
                ></input>
              </div>

              {artist.ArtistImage === "" &&
                Artist.artistImage &&
                Artist.artistImage !== "." &&
                Artist.artistImage !== "string" && (
                  <div className="px-2 flex pb-5">
                    <label className="w-[7rem] flex items-center">
                      Old Image:{" "}
                    </label>
                    <img
                      src={url + Artist.artistImage}
                      alt="..."
                      className="w-[13rem] h-[10rem] m-3"
                    />
                  </div>
                )}

              {artist.ArtistImage && (
                <div className="px-2 flex pb-5">
                  <label className="w-[7rem] flex items-center">
                    New Image:{" "}
                  </label>
                  <img
                    src={artist.ArtistImage}
                    alt="..."
                    className="w-[13rem] h-[10rem] m-3"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-3 mx-5 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditArtist;
