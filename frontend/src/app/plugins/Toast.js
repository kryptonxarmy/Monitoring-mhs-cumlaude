import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const notify = (message) => {
  if (message === "success") {
    toast.success("Submitted Successfully!");
  } else {
    toast.error("Submit Failed!");
  }
};

const Toast = ({ message }) => {

  return (
    <div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Toast;
