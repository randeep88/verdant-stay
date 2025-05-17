import React from "react";
import "../App.css";
import { useDeleteCabin } from "../features/cabins/useDeleteCabin";
import BtnLoader from "./BtnLoader";

const ConfirmDelete = ({ setIsOpenDeleteModal, id }) => {
  const { isDeleting, deleteCabinMutate } = useDeleteCabin();
  console.log(id);

  const handleDeleteCabin = () => {
    if (!id) {
      console.error("No cabin ID provided");
      return;
    }

    deleteCabinMutate(id, {
      onSuccess: () => {
        setIsOpenDeleteModal(false);
      },
      onError: (err) => {
        console.error("Error deleting cabin:", err);
      },
    });
  };

  const handleCancel = () => {
    setIsOpenDeleteModal(false);
  };

  return (
    <div className="modal select-none w-[475px] z-50 p-7 bg-gray-100 shadow-xl rounded-lg text-center">
      <div className="flex flex-col items-start gap-2">
        <h1 className="font-semibold text-xl">Delete Cabin</h1>
        <p className="text-[15px] text-left">
          Are you sure you want to delete this cabin permanently? This action
          cannot be undone.
        </p>
      </div>

      <div className="flex items-center justify-end gap-5 mt-5">
        <button
          onClick={handleCancel}
          disabled={isDeleting}
          className={`${
            isDeleting
              ? `cursor-not-allowed px-3 py-2 text-[15px] rounded-md transition-all border-2 border-gray-700 border-opacity-15 text-black opacity-60`
              : `px-3 active:scale-95 py-2 text-[15px] rounded-md transition-all border-2 border-gray-700 border-opacity-15 text-black hover:bg-opacity-5 hover:bg-gray-700`
          }`}
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteCabin}
          disabled={isDeleting}
          className={`${
            isDeleting
              ? `bg-red-400 opacity-60 text-[15px] text-white px-3 py-2 rounded-md transition-all cursor-not-allowed`
              : `bg-red-600 active:scale-95 text-[15px] text-white px-3 py-2 rounded-md transition-all hover:bg-red-700`
          }`}
        >
          {isDeleting ? (
            <div className="flex items-center gap-2">
              <BtnLoader />
              <p>Deleting...</p>
            </div>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
