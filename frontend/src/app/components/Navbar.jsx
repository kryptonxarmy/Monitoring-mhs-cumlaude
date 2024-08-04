import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { useGetUserData } from "../store/store";

function Navbar() {
  const [isPopUp, setIsPopUp] = useState(false);

  const { users, error, fetch } = useGetUserData((state) => state);

  const handleLogout = () => {
    Cookies.remove("access_token");
    window.location.href = "/";
  };

  useEffect(() => {
    fetch();
  }, []);

  // useEffect(() => {
  //   if (users) {
  //     // console.log("user data : ", users);
  //     console.log("error : " + error);
  //   }
  // }, [users, error]);

  const PopUp = () => {
    return (
      <div className="max-h-screen min-h-screen max-w-screen w-screen bg-[#00000073] flex justify-center items-center fixed z-[99]">
        <div className="h-[25vh] w-[25vw] bg-white rounded-xl shadow-xl p-6">
          <h1 className="text-center text-2xl">YAKIN DECKK???</h1>
          <div className="flex w-full justify-center gap-6 mt-5">
            <button onClick={handleLogout} className="bg-red-400 p-2 rounded-lg font-semibold shadow-lg text-white">
              Log Out
            </button>
            <button onClick={() => setIsPopUp(!isPopUp)} className="bg-yellow-400 p-2 rounded-lg font-semibold shadow-lg text-white">
              BATAL
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isPopUp && <PopUp />}
      <div className="bg-[#001247] fixed z-30 w-screen h-[65px] py-5 flex text-white justify-between px-[3em]">
        <div className="flex">
          <a href="/pages/Mahasiswa/main">
            <img src="https://s1sisteminformasi.id/wp-content/uploads/2024/06/Logo-Sistem-Informasi-328.png" alt="logo sisfo" className="object-cover h-[120%]" />
          </a>
          <div className="flex gap-4 ml-4">
            <h1>11:13 PM</h1>
            <h1>30 Oktober 2023</h1>
          </div>
        </div>
        <div className="flex gap-4">
          <RiArrowDropDownLine className="text-2xl" />
          {users && users.role ? (
            users.role === "mahasiswa" ? (
              <>
                <h1 className="font-semibold">{users ? users?.student?.name : "loading..."}</h1>

                <a href="/pages/Mahasiswa/profile">
                  <img src="https://miro.medium.com/v2/resize:fit:845/1*Y4Hje9Txi_eDoBzq_HAiRQ.jpeg" alt="pp" className="rounded-full h-7 bg-cover w-7" />
                </a>
              </>
            ) : (
              <>
                <h1 className="font-semibold">{users ? users?.lecturer?.name : "loading..."}</h1>

                <a href="/pages/Kaprodi/profile">
                  <img src="https://miro.medium.com/v2/resize:fit:845/1*Y4Hje9Txi_eDoBzq_HAiRQ.jpeg" alt="pp" className="rounded-full h-7 bg-cover w-7" />
                </a>
              </>
            )
          ) : (
            ""
          )}
          <IoIosLogOut className="text-2xl font-extrabold" onClick={() => setIsPopUp(!isPopUp)} />
        </div>
      </div>
    </>
  );
}

export default Navbar;
