import React from "react";
import { BsEmojiFrown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto bg-slate-200 w-[500px] mt-[-80px]">
      <div className="flex mr-auto flex-col gap-6 items-center mb-4">
        <h2 className="text-[100px] font-[600]">404</h2>
        <p className=" text-[34px]">Not found
        </p>
        <div>
          <button
            onClick={() => navigate("/")}
            className="p-3 mb-10 bg-slate-300 mx-2 rounded-lg cursor-pointer"
          >
            Goo Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-slate-400 mx-2 rounded-lg cursor-pointer"
          >
            Goo Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
