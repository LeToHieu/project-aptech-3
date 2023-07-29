import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import EditFeedback from "./EditFeedback";
import AddFeedback from "./AddFeedback";
import Table from "../Table/Table";
function Feedback() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const title = "Danh sách phản hồi";
  const data1 = [
    {
      Id: 1,
      custom_name: "Phúc",
      product_name: "Album",
      total_amount: 1,
    },
  ];
  const data2 = [
    {
      Id: 1,
      custom_name: "Phúc",
      product_name: "Album",
      total_amount: 1,
    },
  ];
  const data = [
    {
      label: "Album Feedback",
      value: "1",
      desc: data1,
    },
    {
      label: "Media Feedback",
      value: "2",
      desc: data2,
    },
  ];
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        access: "Id",
      },
      {
        Header: "Tên khách hàng",
        access: "custom_name",
      },
      {
        Header: "Tên sản phẩm",
        access: "product_name",
      },
      {
        Header: "Giá hoá đơn",
        access: "total_amount",
      },
    ],
    []
  );
  return (
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
      <AddFeedback
        isOpen={isOpenAdd}
        closeModal={() => setIsOpenAdd(false)}
      ></AddFeedback>
      <EditFeedback
        isOpen={isOpenEdit}
        closeModal={() => setIsOpenEdit(false)}
      ></EditFeedback>
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
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              <Table
                setIsOpenAdd={setIsOpenAdd}
                setIsOpenEdit={setIsOpenEdit}
                title = {title}
                columns={columns}
              ></Table>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default Feedback;
