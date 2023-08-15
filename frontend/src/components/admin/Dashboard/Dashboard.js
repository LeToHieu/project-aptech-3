import React from "react";
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "../../../api/axios";
function Dashboard() {
  const [positive, setPos] = useState(0);
  const [negative, setNeg] = useState(0);
  const fetchData = async () => { 
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    try {
      const data = await axios.get('Feedback/stats', config);
      setPos(data.data.feedback[0] / (data.data.feedback[1] + data.data.feedback[0]) * 100)
      setNeg(data.data.feedback[1] / (data.data.feedback[1] + data.data.feedback[0]) * 100)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect( ()=> {
    fetchData();
  }, [])
  const data = [
    {
      "Tích cực": positive,
      "Tiêu cực": negative,
    },
  ];
  return (
    <div className="p-1 flex flex-col justify-center items-center">
      <Typography className="p-2 text-center" color="black" variant="h5">
        Thống kê đánh giá của người dùng
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart width="100%" height="100%" data={data}>
          <CartesianGrid stroke="#000000" strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#000000" }} />
          <YAxis tick={{ fill: "#000000" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Tích cực" fill="#4890F8" />
          <Bar dataKey="Tiêu cực" fill="#A663EA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
