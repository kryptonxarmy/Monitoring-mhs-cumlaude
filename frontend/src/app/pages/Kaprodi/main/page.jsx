"use client";
import Navbar from "../../../components/Navbar";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { LuFileInput } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import Timeline from "../../../components/Kaprodi/Timeline";
import PieChart from "../../../components/Kaprodi/PieChart";
import { useGetUserData } from "../../../store/store";

function DashboardKaprodi() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { users } = useGetUserData();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update setiap detik

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Opsi untuk menampilkan tanggal, bulan, dan tahun
  const dateFormatOptions = {
    year: "numeric",
    month: "short", // atau "short" untuk singkatan bulan
    day: "numeric",
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
      <Navbar />

      {/* SIDEBAR */}
      <div className="w-[23vw] relative z-10 flex flex-col gap-3 border-black py-[7em] h-screen">
        <a href="/pages/Kaprodi/main" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#001247] text-white py-3 rounded-r-xl">
          <MdHome className="text-xl" />
          <h1 className="font-bold text-xl">Dashboard</h1>
        </a>
        <a href="checkfile" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#ffff] text-black py-2 rounded-r-xl">
          <LuFileInput className="text-xl" />
          <h1 className="font-bold text-xl">Show File</h1>
        </a>
      </div>
      {/* ------- SIDEBAR --------- */}

      {/* CENTER */}
      <div className="w-[54vw] pt-[7em] flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <div className="h-10 flex items-center">
            <h1 className="font-bold text-xl text-black">Welcome {users.lecturer?.name} !</h1>
          </div>
          <div className="flex bg-white rounded-lg gap-2 h-10 items-center p-3">
            <FaCalendarAlt />
            <h1 className="font-bold text-xl text-black">{currentDate.toLocaleDateString("id-ID", dateFormatOptions)}</h1>
          </div>
        </div>
        {/* TIMELINE */}
        <div className="bg-white w-full rounded-xl p-4">
          <h1 className="text-xl font-bold mb-6">Timeline</h1>
          <Timeline />
        </div>
        {/* TIMELINE */}
      </div>
      {/* CENTER */}

      {/* RIGHTSIDE */}
      <div className="w-[23vw] bg-white h-[50vh] mt-[7em] mr-4 rounded-xl p-4">
        <PieChart/>
      </div>
      {/* RIGHTSIDE */}
    </div>
  );
}

export default DashboardKaprodi;
