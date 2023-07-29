import React, { useState } from "react";
import AddBills from "./AddBills";
import EditBills from "./EditBills";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Carousel,
  Typography,
} from "@material-tailwind/react";
import Table from "../Table/Table";
import Single_Table from "../Table/Single_Table";
function Bills() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const data1 = [];
  const data2 = [];
  const data = [
    {
      label: "Chưa hết hạn",
      value: "1",
      desc: data1,
    },
    {
      label: "Sắp hết hạn",
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
        access: "name",
      },
      {
        Header: "Tên sản phẩm",
        access: "name",
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
      <AddBills
        isOpen={isOpenAdd}
        closeModal={() => setIsOpenAdd(false)}
      ></AddBills>
      <EditBills
        isOpen={isOpenEdit}
        closeModal={() => setIsOpenEdit(false)}
      ></EditBills>
      <Single_Table
        columns={columns}
        setIsOpenAdd={setIsOpenAdd}
        setIsOpenEdit={setIsOpenEdit}
      ></Single_Table>
    </div>
  );
}

export default Bills;
