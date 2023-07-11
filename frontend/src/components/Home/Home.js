import React from "react";
import Tag from "../Tag/Tag";
import Card from "../Card/Card";

const Home = () => {
  return (
    <>
      <div className="top flex items-center gap-5 h-[8%] max-lg:overflow-x-auto w-full overflow-hidden">
        <Tag title="Tất cả" />
        <Tag title="Âm nhạc" />
        <Tag title="Trò chơi" />
        <Tag title="Hoạt họa" />
        <Tag title="Đã xem" />
        <Tag title="Đã xem" />
        <Tag title="Đề xuất mới" />
        <Tag title="Đề xuất mới" />
        <Tag title="Đề xuất mới" />
      </div>
      <div className="bottom mt-[2%] h-[100%]">
        <div
          className={`
                    list pt-2 grid gap-2 lg:grid-cols-4 sm:grid-cols-3 h-[100%] overflow-auto

                    `}
        >
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};

export default Home;
