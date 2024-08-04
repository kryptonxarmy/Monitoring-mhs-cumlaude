"use client";
import React, { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { LuFileInput } from "react-icons/lu";
import { MdAddBox } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import { useForm } from "react-hook-form";
import { dataList } from "../../../dummy/proposalData";
import toast, { Toaster } from "react-hot-toast";
import { useGetProposalsByStudent } from "../../../store/proposals";
import axios from "axios";
import Cookies from "js-cookie";

function InputFileMahasiswa() {
  const [addBerkas, setAddBerkas] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { proposals, error, fetch } = useGetProposalsByStudent((state) => state);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/proposals/create-proposal",
        {
          title: data.nama_berkas,
          description: data.keterangan,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      notify("success");
    } catch (error) {
      console.log("error: " + error.message);
      notify("failed");
    } finally {
      setIsLoading(false);
    }
    setAddBerkas(false);
  };

  useEffect(() => {
    fetch();
  }, [addBerkas]);

  const notify = (message) => {
    if (message === "success") {
      toast.success("Submitted Successfully!", { duration: 4000 });
    } else {
      toast.error("Submit Failed!");
    }
  };

  const PopUpInputBerkas = () => {
    return (
      <div className=" bg-[#00000065] w-full h-screen flex justify-center items-center fixed z-50">
        <div className="w-1/3 bg-white rounded-3xl flex flex-col p-4">
          <h1 className="font-bold text-2xl text-center mb-4">Input File</h1>
          {/* {message && <Toast message={message} />} */}
          <div className="w-full flex items-center">
            <form onSubmit={handleSubmit(onSubmit)} method="GET">
              <div className="flex gap-4 justify-between items-center mb-4">
                <label htmlFor="namaBerkas" className="font-semibold text-sm">
                  Nama Berkas
                </label>
                <select {...register("nama_berkas")} className="select select-bordered select-sm w-1/2 max-w-xs">
                  <option value="" disabled selected>
                    Nama Berkas
                  </option>
                  <option value="TAK">TAK</option>
                  <option value="Jurnal">Jurnal</option>
                  <option value="Eprt">Eprt</option>
                  <option value="Sertifikat">Sertifikat</option>
                </select>
                {errors.nama_berkas && <Toaster toastOptions={errors} />}
              </div>

              <div className="flex gap-4 justify-between items-center mb-4">
                <label htmlFor="keterangan" className="font-semibold text-sm">
                  Keterangan
                </label>
                <input type="text" {...register("keterangan")} required id="keterangan" placeholder="Type here" className="textarea textarea-bordered textarea-xs w-1/2 max-w-xs" />
                {errors.keterangan && <Toaster />}
              </div>

              <div className="flex gap-4 justify-between items-center mb-4">
                <label htmlFor="file" className="font-semibold text-sm">
                  Masukkan File
                </label>
                <input type="file" id="file" className="file-input file-input-bordered file-input-sm w-2/3 max-w-xs" />
              </div>

              <div className="flex gap-4 justify-center mt-8">
                <button onClick={() => setAddBerkas(false)} type="button" className="btn bg-red-400 text-white hover:bg-red-200 btn-md">
                  Batal
                </button>
                <button type="submit" disabled={isLoading} className="btn bg-green-400 text-white hover:bg-green-300 btn-md disabled:bg-green-300">
                  {isLoading ? <span className="loading loading-spinner loading-md"></span> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
        <Navbar />
        {addBerkas && <PopUpInputBerkas />}

        {/* SIDEBAR */}
        <div className="w-[23vw] relative z-10 flex flex-col gap-3 border-black py-[7em] h-screen">
          <a href="/pages/Mahasiswa/main" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#fff] text-black py-3 rounded-r-xl">
            <MdHome className="text-xl" />
            <h1 className="font-bold text-xl">Dashboard</h1>
          </a>
          <a href="pages/Mahasiswa/inputfile" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#001247] text-white py-2 rounded-r-xl">
            <LuFileInput className="text-xl" />
            <h1 className="font-bold text-xl">Input File</h1>
          </a>
        </div>
        {/* ------- SIDEBAR --------- */}

        {/* TABLE */}
        <div className="pt-[7em] w-[70%]">
          <div className="w-full flex justify-end">
            <button onClick={() => setAddBerkas(true)} className="btn bg-[#001247] text-white hover:bg-[#001247a8] mb-4 btn-md">Add File</button>
          </div>
          <div className="overflow-x-auto bg-white rounded-xl" data-theme="light">
            <h1 className="font-extrabold text-xl ml-4 mt-4">Catatan Aktivitas</h1>
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="text-center text-black font-extrabold">
                  <th>No</th>
                  <th>Berkas</th>
                  <th>Date</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {(proposals != []) ?
                proposals?.map((data, i) => (
                  <tr className="text-center" key={data.id}>
                    <th>{i + 1}</th>
                    <td>{data.title}</td>
                    <td>{data.submission_date.split("T")[0]}</td>
                    <td className="max-w-[3em] max-h-6">{data.description}</td>
                    <td>
                      <div className="bg-[#EBF9F1] text-[#1F9254] px-3 py-1 rounded-xl">{data?.approvals[0]?.status || "Not Approved"}</div>
                    </td>
                    <td>
                      <button className="text-[#624DE3] mx-2 text-xl">
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                )) : <h1>No Data</h1>}
              </tbody>
            </table>
          </div>
          {/* TABLE */}
        </div>
        {/* CENTER */}
      </div>
    </>
  );
}

export default InputFileMahasiswa;
