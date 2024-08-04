"use client";
import React, { useState, useEffect } from "react";
import { MdHome, MdAddBox } from "react-icons/md";
import { LuFileInput } from "react-icons/lu";
import Navbar from "../../../../components/Navbar";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useGetProposalsByStudentId } from "../../../../store/proposals";
import { useParams } from "next/navigation";
import { Download, Edit, View } from "lucide-react";

function CheckFileMahasiswa() {
  const [addBerkas, setAddBerkas] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { proposals, fetch, error } = useGetProposalsByStudentId((state) => state);
  const params = useParams();
  const { id } = params;
  const student_id = parseInt(id);

  useEffect(() => {
    // setStudentId(student_id);
    if (student_id) {
      fetch(student_id);
    }
  }, [student_id]);

  useEffect(() => {
    console.log({
      proposals: proposals,
      error: error,
    });
  }, [proposals]);

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

  const notify = (message) => {
    if (message === "success") {
      toast.success("Submitted Successfully!", { duration: 4000 });
    } else {
      toast.error("Submit Failed!");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
        <Navbar />
        {addBerkas && <PopUpInputBerkas />}

        {/* SIDEBAR */}
        <div className="w-[23vw] relative z-10 flex flex-col gap-3 border-black py-[7em] h-screen">
          <a href="/pages/Kaprodi/main" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#fff] text-black py-3 rounded-r-xl">
            <MdHome className="text-xl" />
            <h1 className="font-bold text-xl">Dashboard</h1>
          </a>
          <a href="pages/Kaprodi/checkfile" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#001247] text-white py-2 rounded-r-xl">
            <LuFileInput className="text-xl" />
            <h1 className="font-bold text-xl">Check File</h1>
          </a>
        </div>
        {/* ------- SIDEBAR --------- */}

        {/* TABLE */}
        <div className="pt-[7em] w-[70%]">
          <div className="w-full flex justify-start">
            <table className="table table-sm mb-4 bg-white w-fit">
              <tbody>
                <tr>
                  <td>Nama</td>
                  <td>: {proposals?.student?.name}</td>
                </tr>
                <tr>
                  <td>NIM</td>
                  <td>: {proposals?.student?.student_id}</td>
                </tr>
                <tr>
                  <td>Dosen Wali</td>
                  <td>: {proposals?.student?.advisor_name}</td>
                </tr>
                <tr>
                  <td>Dosen Pembimbing</td>
                  <td>: {proposals?.student?.supervisor_name || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto bg-white rounded-xl" data-theme="light">
            <h1 className="font-extrabold text-xl ml-4 mt-4">Daftar Berkas Mahasiswa</h1>
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="text-center text-black font-extrabold">
                  <th>No</th>
                  <th>Nama Berkas</th>
                  <th>Date</th>
                  <th>Keterangan</th>
                  <th>File</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {proposals ? (
                  proposals?.latestProposals?.map((data, index) => (
                    <tr className="text-center" key={data.proposal_id}>
                      <th>{index + 1}</th>
                      <td>{data.title}</td>
                      <td>{data.submission_date.split("T")[0]}</td>
                      <td className="max-w-[3em] max-h-6">{data.description}</td>
                      <td className="max-w-[3em] max-h-6">
                        <button><Download/></button>
                      </td>
                      <td>
                        <div className="bg-[#EBF9F1] text-[#1F9254] px-3 py-1 rounded-xl">
                          {data.approvals[0]?.approval_status || "Not Approved"}
                        </div>
                      </td>
                      <td>
                        <button className="text-[#1F9254] mx-2 hover:cursor-pointer text-xl">
                          <Edit onClick={() => setAddBerkas(true)} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* CENTER */}
      </div>
    </>
  );
}

export default CheckFileMahasiswa;
