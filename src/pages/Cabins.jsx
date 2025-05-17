import React, { useState } from "react";
import Loader from "../ui/Loader";
import "../App.css";
import { useCabins } from "../features/cabins/useCabins.js";
import CabinRow from "../features/cabins/CabinRow.jsx";
import Modal from "../ui/Modal.jsx";
import CabinTableOperations from "../features/cabins/CabinTableOperations.jsx";
import SortCabins from "../features/cabins/SortCabins.jsx";
import { useSearchParams } from "react-router-dom";

const Cabins = () => {
  const [editingCabin, setEditingCabin] = useState(null);
  const [isCabinFormOpen, setIsCabinFormOpen] = useState(false);

  const { isPending, cabins, error } = useCabins();

  const [searchParams] = useSearchParams();

  const handleCabinFormOpen = () => {
    setIsCabinFormOpen((isCabinFormOpen) => !isCabinFormOpen);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsCabinFormOpen(false);
    }
  };

  if (isPending) return <Loader />;

  if (error)
    return (
      <div className="text-red-500 text-center">
        Error loading cabins: {error.message}
      </div>
    );
  if (!cabins || cabins.length === 0)
    return (
      <div className="text-center select-none">
        No cabins available for now.
      </div>
    );

  const filterValue = searchParams.get("discount") || "all";
  const sortValue = searchParams.get("sortBy") || "name-asc";

  let filteredCabins = [];
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    if (field === "name") return a.name.localeCompare(b.name) * modifier;
    if (field === "price") return (a.regularPrice - b.regularPrice) * modifier;
    if (field === "capacity") return (a.maxCapacity - b.maxCapacity) * modifier;
    return 0;
  });

  return (
    <div className="flex flex-col w-full h-full select-none">
      <div className="flex items-center justify-between w-full mb-5">
        <h1 className="font-bold text-3xl text-gray-800">Cabins</h1>
        <div className="me-10 flex gap-5 font-semibold">
          <button
            onClick={handleCabinFormOpen}
            className="bg-indigo-500 text-white text-[15px] border-2 border-white active:scale-95 px-3 py-2 rounded-md transition-all hover:bg-indigo-600"
          >
            Create new cabin
          </button>
          <CabinTableOperations />
          <SortCabins />
        </div>
      </div>
      <div className="w-full border-2 border-gray-200 rounded-lg">
        <div className="flex font-bold items-center w-full bg-gray-100 rounded-t-lg py-4">
          <div className="w-1/6 text-center text-[15px]"></div>
          <div className="w-1/6 text-center text-[15px]">
            <div>NAME</div>
          </div>
          <div className="w-1/6 text-center text-[15px]">
            <div>CAPACITY</div>
          </div>
          <div className="w-1/6 text-center text-[15px]">
            <div>PRICE</div>
          </div>
          <div className="w-1/6 text-center text-[15px]">
            <div>DISCOUNT</div>
          </div>
          <div className="w-1/6 text-center text-[15px]">
            <div></div>
          </div>
        </div>

        {sortedCabins.length === 0 ? (
          <div className="text-center font-semibold text-gray-500 pb-4 py-3">
            No Cabins available for now.
          </div>
        ) : (
          sortedCabins.map((cabin) => (
            <CabinRow
              cabin={cabin}
              key={cabin.id}
              editingCabin={editingCabin}
              setEditingCabin={setEditingCabin}
              setIsCabinFormOpen={setIsCabinFormOpen}
            />
          ))
        )}
      </div>
      {isCabinFormOpen && (
        <div
          onClick={handleCloseModal}
          className="modal-overlay fixed inset-0 h-screen w-full backdrop-blur-sm bg-black bg-opacity-20 z-50 flex items-center justify-center"
        >
          <Modal setIsCabinFormOpen={setIsCabinFormOpen} />
        </div>
      )}
    </div>
  );
};

export default Cabins;
