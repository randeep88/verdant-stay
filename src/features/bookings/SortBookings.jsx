import React from "react";
import { useSearchParams } from "react-router-dom";

const SortBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event) => {
    const value = event.target.value;
    const currentParams = Object.fromEntries(searchParams);
    setSearchParams({ ...currentParams, sortBy: value });
  };

  return (
    <div className="relative select-none inline-block rounded-s-md rounded-e-md border-2 border-white">
      <label htmlFor="sortby" className="sr-only">
        Sort bookings by
      </label>
      <select
        className="appearance-none bg-white text-gray-700 rounded-s-md rounded-e-md px-4 py-2 pr-8 border-none focus:outline-none text-[15px] font-medium transition-all cursor-pointer select-none"
        onChange={handleChange}
        name="sortby"
        id="sortby"
        defaultValue={searchParams.get("sortBy") || "date-recent"}
      >
        <option value="date-recent">Sort by date (recent first)</option>
        <option value="date-earlier">Sort by date (earlier first)</option>
        <option value="amount-high">Sort by amount (high first)</option>
        <option value="amount-low">Sort by amount (low first)</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default SortBookings;
