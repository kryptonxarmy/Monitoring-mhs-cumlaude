"use client";

import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "./store/store";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const { data, isLoading, error, fetch } = useAuth();

  const onSubmit = (value) => {
    const payload = {
      username: value.username,
      password: value.password,
    };
    fetch(payload);
  };

  const notify = (msg) => {
    if (msg === "success") {
      toast.success("Login Successfully!");
    } else {
      toast.error("Login Failed!");
    }
  };

  useEffect(() => {
    if (data) {
      try {
        Cookies.set("access_token", data.access_token);
        if (data.data.role === "mahasiswa") {
          window.location.href = "pages/Mahasiswa/main";
        } else if (data.data.role === "dosen" || data.data.role === "kaprodi") {
          window.location.href = "pages/Kaprodi/main";
        }
      } catch (error) {
        console.log("Error setting cookie: " + error.message);
      }
    }
  }, [data]);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="h-screen w-screen flex bg-[#111827]">
        <div className="h-full w-[80%]">
          <div className="absolute w-[80%] mt-20">
            <h1 className="font-black relative text-white text-5xl z-30 w-[60%] mt-12 ml-12">Sistem Managemen Monitoring Mahasiswa Cumlaude</h1>
            <p className="relative text-white z-30 w-[60%] mt-5 ml-12">
              Selamat Datang di Website Monitoring Mahasiswa Cumlaude Sistem Informasi, dengan website ini, anda dapat memantau perkembangan progres untuk mempersiapkan kelulusan anda dengan predikat cumlaude
            </p>
          </div>
          <div className="w-full h-full bg-black opacity-50 z-20 absolute"></div>
          <img src="/img/TULT.png" alt="telu" className="w-full h-full object-cover relative" />
        </div>
        <div className="h-full w-[30%] bg-white relative z-40 flex flex-col justify-center items-center">
          <img className="h-12" src="https://s1sisteminformasi.id/wp-content/uploads/2024/06/Logo-Sistem-Informasi-328.png" alt="logo sisfo" />
          <div className="w-full px-8">
            <h1 className="font-extrabold text-lg text-[#274C77] mb-3 text-start mt-7 underline">Login</h1>
          </div>
          <div className="w-full px-8">
            <form className="w-full text-black" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="username" className="block mb-1 text-sm font-medium">
                  Username
                </label>
                <input
                  type="string"
                  {...register("username")}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-xl"
                  placeholder="120xxxxxx"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-1 text-sm font-medium">
                  Password
                </label>
                <div>
                  {showPassword ? (
                    <EyeOff className="absolute right-[13%] top-[53%] text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <Eye className="absolute right-[13%] top-[53%] text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                  )}
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-xl"
                    required
                  />
                </div>
              </div>
              <div className="w-[80%] mx-auto gap-4 flex flex-col">
                <button type="submit" disabled={isLoading} className="bg-[#4680FF] text-center text-white py-2 rounded-xl">
                  {isLoading ? <span className="loading loading-dots loading-lg"></span> : "Login"}
                </button>
                {error && notify(error)}
                {data && notify("success")}
                <div className="flex flex-col">
                  <hr className="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
                  <p className="text-black font-bold text-center">Kontak Keluhan</p>
                </div>
                <a href="/dashboardmahasiswa" className="bg-[#28A745] flex gap-2 items-center px-4 justify-center text-center text-white py-2 rounded-xl">
                  <FaWhatsapp className="text-center text-xl" />
                  Helpdesk Prodi
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
