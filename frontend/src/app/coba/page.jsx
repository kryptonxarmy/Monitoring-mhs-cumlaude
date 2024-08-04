"use client";

import React from "react";
import { useGetData } from "../store/store"; // Gunakan ekspor bernama

export default function Page() {
  const { data, isLoading } = useGetData("http://localhost:8080/api/users/getAllUsers");

  return (
    <div className="w-screen h-screen min-h-screen max-w-screen bg-sky-400">
      <h1 className="font-bold text-4xl">NYOBA DOANG</h1>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        data.data.map((item) => (
          <p className="text-black" key={item.user_id || item._id}>
            {item.username}
          </p>
        ))
      )}
    </div>
  );
}
