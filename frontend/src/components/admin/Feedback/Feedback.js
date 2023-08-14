import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import axios from "../../../api/axios";
import Table from "../Table/Table";
import parseJson from "../../../Parse"
import Pagination from "../Pagination/Pagination";
import { toast } from 'react-toastify'
function Feedback() {
  const title = "Danh sách phản hồi";
  const [data_media, setMedia] = useState([]);
  const [data_album, setAlbum] = useState([]);
  const [data, setData] = useState([]);

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const [currentPageMedia, setCurrentPageMedia] = useState(1);
  const [currentPageAlbum, setCurrentPageAlbum] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const data1 = [];
  const data2 = [];
  const fetchData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    try {
      const du_lieu_media = await axios.get('MediaFeedback', config);
      setMedia(du_lieu_media.data.feedback);
      const du_lieu_album = await axios.get('AlbumFeedback', config);
      setAlbum(du_lieu_album.data.feedback)
      console.log(du_lieu_album.data.feedback)
    } catch (error) {
      console.log(error.message);
    }
  }
  const fetchData_Comment = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    for (let i = 0; i < data_media.length; i++) {
      let id = data_media[i].id;
      let feedbackId = data_media[i].feedbackId

      const feedback = await axios.get('Feedback/' + feedbackId, config)
      const result_feedback = parseJson(feedback.data.json)
      let custom_name = result_feedback.User.Username
      let product_name = data_media[i].media.mediaName
      let content = data_media[i].feedback.content
      let createdAt = data_media[i].feedback.createdAt
      data1.push({
        id: id,
        feedbackId: feedbackId,
        custom_name: custom_name,
        product_name: product_name,
        content: content,
        createdAt: createdAt
      })
    }
    for (let i = 0; i < data_album.length; i++) {
      let id = data_album[i].id;
      let feedbackId = data_album[i].feedbackId

      const feedback = await axios.get('Feedback/' + feedbackId, config)
      const result_feedback = parseJson(feedback.data.json)
      let custom_name = result_feedback.User.Username
      let product_name = data_album[i].album.albumName
      let content = data_album[i].feedback.content
      let createdAt = data_album[i].feedback.createdAt
      data2.push({
        id: id,
        feedbackId: feedbackId,
        custom_name: custom_name,
        product_name: product_name,
        content: content,
        createdAt: createdAt
      })
    }
    setData([
      {
        label: "Media Feedback",
        value: "1",
        desc: data1,
        total: data1.length
      },
      {
        label: "Album Feedback",
        value: "2",
        desc: data2,
        total: data2.length
      },
    ]);
  }
  const paginate = (pageNumber, value) => {
    if (value === "1") {
      setCurrentPageMedia(pageNumber);
    } else if (value === "2") {
      setCurrentPageAlbum(pageNumber);
    }
    fetchData_Comment();
  };
  useEffect(() => {
    fetchData();
  }, [])
  useEffect(() => {
    fetchData_Comment();
  }, [data_media, data_album, currentPageMedia, currentPageAlbum]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        access: "id",
      },
      {
        Header: "Tên người dùng",
        access: "custom_name",
      },
      {
        Header: "Tên sản phẩm",
        access: "product_name",
      },
      {
        Header: "Nội dung bình luận",
        access: "content",
      },
      {
        Header: "Thời gian bình luận",
        access: "createdAt",
      },
    ],
    []
  );
  const handleDelete = async (id, value) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this comment?");
    if (shouldDelete) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        if (value === "1") {
          await axios.post("MediaFeedback/delete/" + id, config);
        } else if (value === "2") {
          await axios.post("AlbumFeedback/delete/" + id, config);
        }
        toast.success("Xoá bình luận thành công");
        fetchData();
        fetchData_Comment();
      } catch (error) {
        toast.error(error.message);
      }

    }
  }
  return (
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
      <Tabs id="custom-animation" value="1">
        <TabsHeader className="z-0">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc, total }) => {
            const currentDesc =
              value === "1"
                ? desc.slice(
                  (currentPageMedia - 1) * postPerPage,
                  currentPageMedia * postPerPage
                )
                : desc.slice(
                  (currentPageAlbum - 1) * postPerPage,
                  currentPageAlbum * postPerPage
                );

            return (
              <TabPanel key={value} value={value}>
                {currentDesc && currentDesc.length > 0 ? (
                  <>
                    <Table
                      title={title}
                      columns={columns}
                      propData={currentDesc}
                      value={value}
                      handleDelete={handleDelete}
                    />
                    <Pagination
                      postPerPage={postPerPage}
                      totalPost={total}
                      currentPage={
                        value === "1"
                          ? currentPageMedia
                          : currentPageAlbum
                      }
                      paginate={(pageNumber) =>
                        paginate(pageNumber, value)
                      }
                    />
                  </>
                ) : (
                  <p>No data available.</p>
                )}
              </TabPanel>
            );
          })}
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default Feedback;
