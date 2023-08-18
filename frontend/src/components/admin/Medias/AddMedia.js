import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import DeleteIcon from "@mui/icons-material/Delete";

const GET_ARTIST_BY_ID = "Artist/";
const GET_MEDIA = "Media/";
const GET_CATEGORY = "Category/";
const url = "https://localhost:7023/resources/";
const AddMedia = () => {
  const navigate = useNavigate();
  const [Artist, setArtist] = useState();
  const [Categories, SetCategories] = useState();
  const initialMedia = {
    MediaName: "",
    MediaImage: "",
    fileImage: "",
    MediaUrl: "",
    fileVideo: "",
    Price: "",
    CategoryId: "",
    ArtistId: "",
  };

  useEffect(() => {
    getCategory();
  }, []);

  const [media, setMedia] = useState(initialMedia);
  const [mediaType, setMediaType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChooseMedia = (event) => {
    const fileVideo = event.target.files[0];
    const allowedVideoMimeTypes = ["video/mp4", "video/webm", "video/ogg"];
    const allowedAudioMimeTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "audio/mp3",
    ];

    if (fileVideo !== null && fileVideo !== undefined) {
      if (allowedVideoMimeTypes.includes(fileVideo.type)) {
        setMediaType("video");
      }
      if (allowedAudioMimeTypes.includes(fileVideo.type)) {
        setMediaType("audio");
      }

      if (
        !allowedAudioMimeTypes.includes(fileVideo.type) &&
        !allowedVideoMimeTypes.includes(fileVideo.type)
      ) {
        toast.error("file not allowed, file must be video or audio type");
        setMediaType("");
        return;
      }
      const MediaUrl = URL.createObjectURL(fileVideo);
      setMedia({ ...media, fileVideo, MediaUrl });
    } else {
      setMedia({ ...media, MediaUrl: "", fileVideo: "" });
      setMediaType("");
    }
  };

  const chooseFile = async (event) => {
    event.preventDefault();
    const fileImage = event.target.files[0];
    const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (fileImage !== null && fileImage !== undefined) {
      if (!allowedMimeTypes.includes(fileImage.type)) {
        toast.error("file not allowed, file must be image type");
        return;
      }
      const MediaImage = URL.createObjectURL(fileImage);
      setMedia({ ...media, fileImage: "", MediaImage: "" });
      setMedia({ ...media, fileImage, MediaImage });
    } else {
      setMedia({ ...media, fileImage: "", MediaImage: "" });
    }
  };
  const handleGetArtistById = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const du_lieu = await axios.get(GET_ARTIST_BY_ID + id, config);
      setMedia({ ...media, ArtistId: du_lieu.data.artist.id });
      setArtist(du_lieu.data.artist);

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

  const handleDeleteArtist = (e) => {
    e.preventDefault();
    setMedia({ ...media, ArtistId: "" });
    setArtist("");
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      toast.error("Please fill add user by id field!");
      return;
    }

    handleGetArtistById(searchTerm);
    setSearchTerm("");
  };

  const getCategory = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(GET_CATEGORY, config);
      SetCategories(response.data.categories);
    } catch (error) {
      if (!error?.response) {
        toast.error("No server response, Cannot get categories");
      } else if (error?.response.data.message) {
        toast.error(`${error?.response.data.message}`);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedPrice = await parseFloat(media.Price);
    await setMedia({ ...media, Price: parsedPrice });

    if (media.ArtistId === "") {
      toast.error("Please add artist to media");
      return;
    }

    const formData = new FormData();
    await Object.keys(media).forEach((key) => {
      formData.append(key, media[key]);
    });
    const config = {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    };

    try {
      var response = await axios.post(GET_MEDIA + "add/", formData, config);
      if (response !== null) {
        toast.success("Add media successfully!");
        setMedia(initialMedia);
        setArtist("");
        setMediaType("");
      } else {
        toast.error("Cannot add media!");
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
        <div className="my-2 pb-5">
          <div className="float-left ">Add Media</div>
          <button
            onClick={() => navigate(-1)}
            className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
        <form action="#" onSubmit={(e) => handleSubmit(e)}>
          <div
            className={`${
              media.MediaImage || media.MediaUrl
                ? "grid lg:md:grid-cols-3 pt-5"
                : ""
            }`}
          >
            <div className="pe-5">
              {console.log(media.MediaUrl)}
              {media.MediaUrl &&
                media.MediaUrl !== "" &&
                mediaType === "video" && (
                  <div>
                    <label className=" pt-5 flex items-center ">
                      Media's Video:{" "}
                    </label>
                    <video
                      controls
                      width="320"
                      height="240"
                      src={media.MediaUrl}
                      type="video/mp4"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              {media.MediaUrl &&
                media.MediaUrl !== "" &&
                mediaType === "audio" && (
                  <div>
                    <label className=" pt-5 flex items-center ">
                      Media's Music:{" "}
                    </label>
                    <audio
                      controls
                      width="320"
                      height="240"
                      src={media.MediaUrl}
                      type="audio/mpeg"
                    >
                      Your browser does not support the audio tag.
                    </audio>
                  </div>
                )}
              {media.MediaImage && (
                <div className="flex mt-5">
                  <label className="w-[4rem] flex items-center justify-center">
                    Media's Image:{" "}
                  </label>
                  <img
                    width="120"
                    src={media.MediaImage}
                    alt="..."
                    className=" m-3"
                  />
                </div>
              )}
            </div>

            <div
              className={`grid  ${
                media.MediaImage || media.MediaUrl
                  ? "sm:grid-cols-1 lg:md:col-span-2 md:sm:col-span-1"
                  : "sm:grid-cols-1 lg:md:grid-cols-2"
              } pt-5`}
            >
              <div className="flex items-center">
                <label className="w-[4rem] flex items-center justify-center">
                  Name:{" "}
                </label>
                <input
                  required
                  value={media.MediaName}
                  onChange={(e) =>
                    setMedia({ ...media, MediaName: e.target.value })
                  }
                  className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="Media Name"
                ></input>
              </div>
              <div className="flex items-center">
                <label className="w-[4rem] flex items-center justify-center">
                  Price:{" "}
                </label>
                <input
                  required
                  value={media.Price}
                  onChange={(e) =>
                    setMedia({ ...media, Price: e.target.value })
                  }
                  type="number"
                  step="0.01"
                  className="w-[80%] rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                  placeholder="Media's Price"
                />
              </div>
              <div className="flex items-center">
                <label className="w-[4rem] flex items-center justify-center">
                  Categories:{" "}
                </label>
                <select
                  required
                  onChange={(e) =>
                    setMedia({ ...media, CategoryId: e.target.value })
                  }
                  value={media.CategoryId}
                  className="w-[80%]  rounded-md h-[2rem] border-2 border-black-600 hover:border-blue-300 m-3"
                >
                  <option value="" disabled hidden>
                    Select Category
                  </option>
                  {Categories !== undefined && Categories !== "" ? (
                    Categories.map((category, index) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Loading
                    </option>
                  )}
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-[4rem] flex items-center justify-center">
                  Media:{" "}
                </label>
                <input
                  accept="video/*, audio/*"
                  type="file"
                  required
                  defaultValue={""}
                  onChange={(event) => handleChooseMedia(event)}
                  className="text-sm w-[13rem] h-[2rem] m-3"
                ></input>
              </div>
              <div className="flex  items-center">
                <label className="flex items-center justify-center w-[5rem]">
                  Artist:{" "}
                </label>
                {Artist ? (
                  <div className="flex w-[17rem] justify-between">
                    <div>
                      <img
                        className="h-10 w-10 rounded-lg flex items-center justify-center"
                        src={url + Artist.artistImage}
                        alt="..."
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      {Artist.artistName}
                    </div>

                    <button
                      className=" text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={(e) => handleDeleteArtist(e)}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      required
                      type="text"
                      className="border  border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
                      placeholder="Find artist by id..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      onClick={() => handleSearch()}
                      type="button"
                      className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Search
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center">
                <label className="w-[4rem] flex items-center justify-center">
                  Media's Image:{" "}
                </label>
                <input
                  required
                  accept="image/*"
                  type="file"
                  defaultValue={""}
                  onChange={(event) => chooseFile(event)}
                  className="text-sm w-[13rem] h-[2rem] m-3 flex"
                ></input>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="mt-3 mx-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMedia;
