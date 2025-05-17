import React from "react";
import { useSearchParams } from "react-router-dom";

const BookingFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("discount") || "all";

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "checked-in", label: "Checked In" },
    { value: "checked-out", label: "Checked Out" },
    { value: "unconfirmed", label: "Unconfirmed" },
  ];

  const handleFilterChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete("discount");
    } else {
      newParams.set("discount", value);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="flex select-none items-center rounded-md overflow-hidden text-[15px] border-2 border-white bg-white">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleFilterChange(option.value)}
          className={`cursor-pointer px-4 py-2 ${
            currentFilter === option.value
              ? "bg-indigo-500 text-white text-[15px] font-medium select-none rounded-sm"
              : "bg-white bg-opacity-10 text-gray-700 text-[15px] font-medium select-none"
          } transition-all`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default BookingFilter;
