import React, { useState, useEffect, useRef } from "react";
import { formatToINR } from "../../utils/formatToINR.js";
import { HiOutlineXMark } from "react-icons/hi2";
import { FiCopy, FiEdit, FiTrash2 } from "react-icons/fi";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../ui/Modal.jsx";
import "../../App.css";

const CabinRow = ({
  cabin,
  setIsCabinFormOpen,
  editingCabin,
  setEditingCabin,
}) => {
  const { id, name, discount, image, description, maxCapacity, regularPrice } =
    cabin;

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const { createCabinMutate } = useCreateCabin();

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleCloseDeleteModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsOpenDeleteModal(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowButtons(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleEditForm = (cabinId) => {
    setEditingCabin(editingCabin === cabinId ? null : cabinId);
    setShowButtons(false);
  };

  const handleDuplicateCabin = () => {
    createCabinMutate({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
    setShowButtons(false);
  };

  const handleThreeDotsClick = () => {
    setShowButtons((prev) => !prev);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsCabinFormOpen(false);
      setEditingCabin(null);
    }
  };

  return (
    <div>
      <div className="select-none flex items-center justify-between py-2 font-semibold w-full bg-white border-b border-gray-200 transition-all relative">
        <div className="w-1/6 flex items-center justify-end">
          <div className="w-24 h-14 overflow-hidden rounded-md">
            <img src={image} className="w-24" alt={name} />
          </div>
        </div>
        <div className="w-1/6 text-center text-[15px]">
          <div>{name}</div>
        </div>
        <div className="w-1/6 text-center text-[15px]">
          <div>Fits up to {maxCapacity} guests</div>
        </div>
        <div className="w-1/6 text-center text-[15px]">
          <div>{formatToINR(regularPrice)}</div>
        </div>
        <div className="w-1/6 text-center text-[15px]">
          {!discount ? <span>—</span> : <div>{formatToINR(discount)}</div>}
        </div>
        <div className="w-1/6 text-center text-sm relative">
          <button
            ref={buttonRef}
            onClick={handleThreeDotsClick}
            className="hover:bg-gray-100 rounded-full active:scale-95 p-2 transition-all"
          >
            <BsThreeDotsVertical className="text-xl text-gray-500" />
          </button>
          {showButtons && (
            <div
              ref={menuRef}
              className="absolute top-0 right-[8rem] bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-1 z-10 shadow-lg border border-gray-200"
            >
              <button
                onClick={handleDuplicateCabin}
                className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-all active:scale-95"
              >
                <FiCopy className="text-xl text-opacity-80 text-gray-500" />
                Duplicate
              </button>
              {editingCabin !== id ? (
                <button
                  onClick={() => toggleEditForm(id)}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-all active:scale-95"
                >
                  <FiEdit className="text-xl text-opacity-80 text-gray-500" />
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => toggleEditForm(id)}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-all active:scale-95"
                >
                  <HiOutlineXMark className="text-xl text-gray-500" />
                  Close
                </button>
              )}
              <button
                onClick={() => {
                  setIsOpenDeleteModal(true);
                  setShowButtons(false);
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-all active:scale-95"
              >
                <FiTrash2 className="text-xl text-red-500" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {editingCabin === id && (
        <div
          onClick={handleCloseModal}
          className="modal-overlay modal h-screen w-full backdrop-blur-sm bg-black bg-opacity-20 z-50"
        >
          <Modal
            setIsCabinFormOpen={setIsCabinFormOpen}
            cabinToEdit={cabin}
            setEditingCabin={setEditingCabin}
          />
        </div>
      )}
      {isOpenDeleteModal && (
        <div
          onClick={handleCloseDeleteModal}
          className="modal-overlay h-screen w-full backdrop-blur-sm bg-black bg-opacity-20 fixed inset-0 z-50"
        >
          <ConfirmDelete id={id} setIsOpenDeleteModal={setIsOpenDeleteModal} />
        </div>
      )}
    </div>
  );
};

export default CabinRow;
