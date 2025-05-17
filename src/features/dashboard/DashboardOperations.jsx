import React from "react";
import { useSearchParams } from "react-router-dom";

const DashboardOperations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (value) => {
    searchParams.set("last", value);
    setSearchParams(searchParams);
  };

  const currentFilter = searchParams.get("last") || "7";

  return (
    <div className="flex select-none items-center rounded-md overflow-hidden text-[15px] border-2 border-white bg-white">
      <h1
        onClick={() => handleClick("7")}
        className={`cursor-pointer px-4 py-2 ${
          currentFilter === "7"
            ? "bg-indigo-500 text-white text-[14px] font-medium select-none rounded-sm"
            : "bg-white bg-opacity-10 text-gray-700 text-[14px] font-medium select-none"
        } transition-all`}
      >
        Last 7 days
      </h1>
      <h1
        onClick={() => handleClick("30")}
        className={`cursor-pointer px-4 py-2 ${
          currentFilter === "30"
            ? "bg-indigo-500 text-white text-[14px] font-medium select-none rounded-sm"
            : "bg-white bg-opacity-10 text-gray-700 text-[14px] font-medium select-none"
        } transition-all`}
      >
        Last 30 days
      </h1>
      <h1
        onClick={() => handleClick("90")}
        className={`cursor-pointer px-4 py-2 ${
          currentFilter === "90"
            ? "bg-indigo-500 text-white text-[14px] font-medium select-none rounded-sm"
            : "bg-white bg-opacity-10 text-gray-700 text-[14px] font-medium select-none"
        } transition-all`}
      >
        Last 90 days
      </h1>
    </div>
  );
};

export default DashboardOperations;
