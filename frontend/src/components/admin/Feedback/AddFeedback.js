import React, { useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

const GET_Album = "Album/";
const GET_Media = "Media/";
function AddFeedback({ isOpen, closeModal, fetchData }) {
  const [content, setContent] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [mediaId, setMediaId] = useState("");
  const [mediaData, setMediaData] = useState(null);
  const [albumData, setAlbumData] = useState(null);
  const {user} = useSelector(state => state.user)
  
  const handleCancle = () => {
    setAlbumId("")
    setMediaId("")
    setContent("")
    setMediaData(null)
    setAlbumData(null)
    closeModal()
  }
  const handleAddFeedback = async () => {
    if (!content) {
      toast.error("Bạn chưa bình luận gì")
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const feedback = {
      userId: user.id,
      content: content
    }
    try {

      const feedbackResponse = await axios.post("Feedback/add", feedback, config);
      const newfeedback = feedbackResponse.data.newFeedback;
      if (newfeedback) {
        if (mediaData) {
          const data = {
            mediaId: mediaData.id,
            feedbackId: newfeedback.id
          }
          const result = await axios.post("MediaFeedback/add", data, config);
          if (!result.data.status) {
            toast.error("Thêm bình luận không thành công")
          }
          toast.success("Thêm bình luận thành công")
        } else if (albumData) {
          const data = {
            albumId: albumData.id,
            feedbackId: newfeedback.id
          }
          const result = await axios.post("AlbumFeedback/add", data, config);
          if (!result.data.status) {
            toast.error("Thêm bình luận không thành công")
          }
          toast.success("Thêm bình luận thành công")
        }
        fetchData();
        handleCancle()
      } else {
        toast.error("Thêm bình luận thất bại");
      }
    } catch(error) {
      toast.error("Có lỗi xảy ra. Thêm bình luận không thành công");
    }
    closeModal();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!albumId && !mediaId) {
      toast.error("Vui lòng nhập cả Album ID hoặc Media ID");
      return;
    } else if (albumId && mediaId) {
      toast.error("Bạn chỉ được điền 1 trong 2");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      if (albumId) {
        setMediaData(null);
        const album = await axios.get(GET_Album + albumId, config);
        setAlbumData({
          id: album.data.album.id,
          type: "album",
          name: album.data.album.albumName,
          price: album.data.album.price,
        });
        toast.success("Tìm thấy sản phẩm");
      } else {
        setAlbumData(null);
        const media = await axios.get(GET_Media + mediaId, config);
        setMediaData({
          id: media.data.media.media.id,
          type: "media",
          name: media.data.media.media.mediaName,
          price: media.data.media.media.price,
        });
        toast.success("Tìm thấy sản phẩm");
      }

    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center ${isOpen ? "" : "hidden"
        }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        id="section2"
        className="p-8 mt-6 lg:mt-0 rounded shadow bg-white relative"
      >
        <form>
          <SearchIcon
            className="absolute top-2 right-2 hover:opacity-50 cursor-pointer"
            onClick={(e) => handleSearch(e)}
          />
          <div className="md:flex mb-6 items-center">
            <div className="md:w-1/3">
              <label
                className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                htmlFor="album-id-input"
              >
                Album ID
              </label>
            </div>
            <div className="md:w-2/3 relative">
              <input
                className="form-input block w-full focus:bg-white"
                id="album-id-input"
                type="text"
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 font-bold text-gray-600 uppercase">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>
          <div className="md:flex mb-6 items-center">
            <div className="md:w-1/3">
              <label
                className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                htmlFor="media-id-input"
              >
                Media ID
              </label>
            </div>
            <div className="md:w-2/3 relative">
              <input
                className="form-input block w-full focus:bg-white"
                id="media-id-input"
                type="text"
                value={mediaId}
                onChange={(e) => setMediaId(e.target.value)}
              />
            </div>
          </div>
        </form>
        {albumData && (
          <>

            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <p>{albumData.name}</p>
              </div>
            </div>

            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                  Price
                </label>
              </div>
              <div className="md:w-2/3">
                <p>{albumData.price}</p>
              </div>
            </div>
          </>
        )}
        {mediaData && (
          <>

            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <p>{mediaData.name}</p>
              </div>
            </div>

            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                  Price
                </label>
              </div>
              <div className="md:w-2/3">
                <p>{mediaData.price}</p>
              </div>
            </div>
          </>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          {(albumData || mediaData) && (
            <div className="md:flex mb-6 items-center">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="content-input"
                >
                  Feedback Content
                </label>
              </div>
              <div className="md:w-2/3 relative">
                <textarea
                  className="form-input block w-full focus:bg-white border border-gray-300 rounded p-2"
                  id="content-input"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              {(albumData || mediaData) && (
                <button
                  className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-2"
                  type="button"
                  onClick={(e) => handleAddFeedback(e)}
                >
                  Add
                </button>
              )}

              <button
                className="shadow bg-red-700 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleCancle}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFeedback;
