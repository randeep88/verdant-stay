import React from "react";
import { useSearchParams } from "react-router-dom";

const CabinTableOperations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (value) => {
    searchParams.set("discount", value);
    setSearchParams(searchParams);
  };

  const currentFilter = searchParams.get("discount") || "all";

  return (
    <div className="flex select-none items-center rounded-md overflow-hidden text-[15px] border-2 border-white bg-white">
      <h1
        onClick={() => handleClick("all")}
        className={`cursor-pointer px-4 py-2  ${
          currentFilter === "all"
            ? "bg-indigo-500 text-white text-[15px] font-medium select-none rounded-sm"
            : "bg-white bg-opacity-10 text-gray-700 text-[15px] font-medium select-none"
        } transition-all`}
      >
        All
      </h1>
      <h1
        onClick={() => handleClick("no-discount")}
        className={`cursor-pointer px-4 py-2  ${
          currentFilter === "no-discount"
            ? "bg-indigo-500 text-white text-[15px] font-medium select-none rounded-sm"
            : "bg-white bg-opacity-10 text-gray-700 text-[15px] font-medium select-none"
        } transition-all`}
      >
        No discount
      </h1>
      <h1
        onClick={() => handleClick("with-discount")}
        className={`cursor-pointer px-4 py-2 ${
          currentFilter === "with-discount"
            ? "bg-indigo-500 text-white text-[15px] font-medium select-none rounded-sm"
            : "bg-white bg-opacity-10 text-gray-700 text-[15px] font-medium select-none"
        } transition-all`}
      >
        With discount
      </h1>
    </div>
  );
};

export default CabinTableOperations;
