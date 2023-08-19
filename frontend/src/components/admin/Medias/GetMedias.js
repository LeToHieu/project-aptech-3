import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../api/axios";

import DataTable from "react-data-table-component";

const GET_MEDIA = "Media";
const GET_ARTIST_MEDIA = "ArtistMedia";
const GET_CATEGORY = "Category/";
const url = "https://localhost:7023/resources/";
const GetMedias = () => {
  const navigate = useNavigate();
  const [Medias, setMedias] = useState();
  const [Categories, SetCategories] = useState();
  useEffect(() => {
    getCategory();
    getMedias();
  }, []);

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

  const getMedias = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(GET_MEDIA, config);
      const sortedMedias = response.data.medias.sort(
        (a, b) => b.media.id - a.media.id
      );
      setMedias(sortedMedias);
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
  const handleDeleteMedia = async (event, mediaId, mediaCateID) => {
    event.preventDefault();
    try {
      await deleteArtistMedia(event, mediaId, mediaCateID);
      await deleteMedia(event, mediaId);
      getMedias();
    } catch (error) {
      toast.error("Cannot delete media");
    }
  };

  const deleteArtistMedia = async (event, id, mediaCateID) => {
    event.preventDefault();
    const myDeletedMedia = {
      artistId: id,
      mediaId: mediaCateID,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        GET_ARTIST_MEDIA + "/delete/",
        myDeletedMedia,
        config
      );
      if (response) {
      } else {
        toast.error("Cannot media artist media!");
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

  const deleteMedia = async (event, id) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(GET_MEDIA + "/delete/" + id, config);
      if (response) {
        toast.success("Deleted media successfuly!");
      } else {
        toast.error("Cannot media user!");
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
      selector: (row) => row.media.id,
    },
    {
      name: "Name",
      selector: (row) => row.media.mediaName,
    },
    {
      name: "Artist",
      selector: (row) => (
        <>
          <img
            className="h-10 w-10 rounded-lg flex items-center justify-center"
            src={url + row.artist.artistImage}
            alt="..."
          />
          <div className="whitespace-normal break-all">
            {row.artist.artistName}
          </div>
        </>
      ),
    },
    {
      name: "Create At",
      selector: (row) => row.media.createdAt,
    },
    {
      name: "Category",
      selector: (row) =>
        Categories !== undefined &&
        Categories !== "" &&
        Categories.filter(
          (category) => category.id === row.media.categoryId
        ).map((category, index) => category.categoryName),
    },

    {
      name: "Price",
      selector: (row) => row.media.price + " $",
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            onClick={() => {
              navigate("/admin/medias/editMedia/" + row.media.id);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 me-2 my-1 px-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={(event) =>
              handleDeleteMedia(event, row.media.id, row.media.categoryId)
            }
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
        <div className="my-2">
          <div className="text-xl float-left my-2 hover:bg-blue-700 font-bold">
            Medias Table
          </div>
          <Link to="addMedia">
            <button className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Medias
            </button>
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={Medias}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
        />
      </div>
    </>
  );
};

export default GetMedias;