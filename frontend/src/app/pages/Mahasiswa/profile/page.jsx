"use client";

import React from "react";
import TULT from "../../../../../public/img/TULT.png";
import Navbar from "../../../components/Navbar";
import { useGetUserData } from "../../../store/store";

function ProfileMahasiswa() {
  const { users, fetch, error } = useGetUserData();

  return (
    <>
      <div className="bg-[#E7ECEF] h-fit  flex gap-6" data-theme="light">
        <Navbar />
        <div className="w-screen h-full flex flex-col px-[5em]">
          <div className="mt-[7em] w-full bg-white mb-[3em] h-fit rounded-xl">
            <img className="object-cover h-[250px] w-full rounded-t-xl " src={TULT} alt="" />
            <div className="flex px-4 justify-between">
              <div className="flex px-4 h-[123px]">
                <img className="object-cover relative bottom-20 mx-3 w-[179px] h-[179px] rounded-full" src={TULT} alt="gambar" />
                <div className="flex flex-col my-auto">
                  <h1 className="font-black text-xl">{users?.student?.name}</h1>
                  <p className="text-gray-400">{users?.student?.student_id}</p>
                </div>
              </div>
              <div className="px-4 items-center flex">
                <button className="btn btn-sm px-7 text-[#001247] hover:text-white bg-transparent border-[#001247] hover:bg-[#001247]">Edit Profile</button>
              </div>
            </div>
          </div>

          {/* YANG BAWAH */}
          <div className="flex gap-4">
            <div className="p-3 w-[20%] h-full bg-white rounded-xl">
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
            </div>
            <div className="p-3 w-[20%] h-full bg-white rounded-xl">
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
            </div>
            <div className="p-3 w-[20%] h-full bg-white rounded-xl">
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
            </div>
            <div className="p-3 w-[20%] h-full bg-white rounded-xl">
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
            </div>
            <div className="p-3 w-[20%] h-full bg-white rounded-xl">
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
              <h1>Hallow</h1>
            </div>
          </div>
          {/* YANG BAWAH */}
        </div>
      </div>
    </>
  );
}

export default ProfileMahasiswa;
