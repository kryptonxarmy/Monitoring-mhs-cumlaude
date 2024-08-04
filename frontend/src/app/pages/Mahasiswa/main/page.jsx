"use client";
import React, { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { LuFileInput } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import Navbar from "../../../components/Navbar";
import Cookies from "js-cookie";
import { useStore, useGetUserData } from "../../../store/store";

function DashboardMahasiswa() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [token, setToken] = useState(null)
  const { users } = useGetUserData();
  const [name, setName] = useState("");

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

  

  return (
    <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
      <Navbar />

      {/* SIDEBAR */}
      <div className="w-[23vw] relative z-10 flex flex-col gap-3 border-black py-[7em] h-screen">
        <a href="/pages/Mahasiswa/main" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#001247] text-white py-3 rounded-r-xl">
          <MdHome className="text-xl" />
          <h1 className="font-bold text-xl">Dashboard</h1>
        </a>
        <a href="/pages/Mahasiswa/inputfile" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#ffff] text-black py-2 rounded-r-xl">
          <LuFileInput className="text-xl" />
          <h1 className="font-bold text-xl">Input File</h1>
        </a>
      </div>
      {/* ------- SIDEBAR --------- */}

      {/* CENTER */}
      <div className="w-[54vw] pt-[7em] flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <div className="h-10">
            <h1 className="font-bold text-black">Hi! {users.student?.name}</h1>
            <p className="text-lg text-black">Welcome Back!</p>
          </div>
          <div className="flex bg-white rounded-lg gap-2 h-10 items-center p-3">
            <FaCalendarAlt />
            <h1 className="font-bold text-xl text-black">{currentDate.toLocaleDateString("id-ID", dateFormatOptions)}</h1>
          </div>
        </div>
        {/* TIMELINE */}
        <div className="bg-white w-full h-[190px] mt-10 rounded-xl p-4">
          <h1 className="font-bold text-xl text-black">Timeline</h1>
          <ul className="timeline mt-4 text-black">
            <li>
              <div className="timeline-start ">Bimbingan ke-5</div>
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <hr className="bg-primary" />
            </li>
            <li>
              <hr className="bg-primary" />
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="timeline-end ">Verif Bimbingan ke-5</h1>
              <hr className="bg-primary" />
            </li>
            <li>
              <hr className="bg-[#001247]" />
              <div className="timeline-start ">Input Berkas</div>
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#001247]">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="timeline-end ">Bimbingan ke-6</div>
              <hr />
            </li>
            <li>
              <hr className="bg-[#001247]" />
              <div className="timeline-start ">Verif Bimbingan ke-6</div>
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
            </li>
          </ul>
        </div>
        {/* TIMELINE */}

        {/* Presentase */}
        <div className="flex w-full gap-4 h-[190px]">
          <div className="w-1/2 h-full bg-white rounded-xl p-3">
            <h1 className="text-xl font-bold text-black mb-4">Presentase Untuk Cumlaude</h1>
            <div className="w-full flex justify-center items-center gap-4">
              <div className="radial-progress text-primary" style={{ "--value": 80, "--size": "8rem" }} role="progressbar">
                80%
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <div className="h-5 w-5 bg-primary"></div>
                  <h1 className="text-black">Memenuhi</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="h-5 w-5 bg-current"></div>
                  <h1 className="text-black">Tidak Memenuhi</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full bg-white rounded-xl p-3">
            <h1 className="text-xl font-bold text-black mb-4">Bimbingan Terpenuhi</h1>
            <center>
              <div className="w-full flex justify-center items-center gap-4">
                <div
                  className="radial-progress text-primary"
                  style={{
                    "--value": 37.5,
                    "--size": "8rem",
                  }}
                  role="progressbar"
                >
                  37.5%
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <div className="h-5 w-5 bg-primary"></div>
                    <h1 className="text-black">Memenuhi</h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="h-5 w-5 bg-current"></div>
                    <h1 className="text-black">Tidak Memenuhi</h1>
                  </div>
                </div>
              </div>
            </center>
          </div>
        </div>
        {/* presentase */}

        {/* TABLE */}
        <div className="overflow-x-auto bg-white rounded-xl" data-theme="light">
          <h1 className="font-bold text-xl ml-4 mt-4">Recent Activities</h1>
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-center text-black font-extrabold">
                <th>No</th>
                <th>Berkas</th>
                <th>Keperluan</th>
                <th>Date</th>
                <th>Keterangan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const rows = [];
                for (let i = 1; i < 6; i++) {
                  rows.push(
                    <tr key={i} className="text-center">
                      <th>{i}</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                      <td>Red</td>
                      <td>
                        <button className="bg-[#EBF9F1] text-[#1F9254] px-3 py-1 rounded-xl">Delivered</button>
                      </td>
                    </tr>
                  );
                }
                return rows;
              })()}
            </tbody>
          </table>
        </div>
        {/* TABLE */}
      </div>
      {/* CENTER */}

      {/* LEFTSIDE */}
      <div className="w-[23vw] bg-white h-[50vh] mt-[7em] mr-4 rounded-xl p-4">
        <div className="flex gap-2 items-center">
          <IoMdNotifications className="text-2xl" />
          <h1 className="font-bold text-xl">Task</h1>
        </div>
        <div className="mt-2">
          <p>Apa aja?</p>
          <p>Apa aja?</p>
          <p>Apa aja?</p>
          <p>Apa aja?</p>
          <p>Apa aja?</p>
        </div>
      </div>
      {/* LEFTSIDE */}
    </div>
  );
}

export default DashboardMahasiswa;
