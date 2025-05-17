import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatToINR } from "../../utils/formatToINR";
import { getDaysUntilNow, isToday } from "../../utils/checkDate";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { MdLogin, MdLogout } from "react-icons/md";
import { useUpdateCheckout } from "./useUpdateCheckout";
import Loader from "../../ui/Loader";
import { FiTrash2 } from "react-icons/fi";
import ConfirmDeleteBooking from "../../ui/confirmDeleteBooking";

const BookingRow = ({ booking }) => {
  const { isUpdating, updateCheckoutDetails } = useUpdateCheckout();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    id,
    cabins,
    guests,
    startDate,
    endDate,
    status,
    totalPrice,
    numNights,
  } = booking;

  const navigate = useNavigate();

  const [showButtons, setShowButtons] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleCloseDeleteModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setOpenDeleteModal(false);
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

  const handleThreeDotsClick = () => {
    setShowButtons((prev) => !prev);
  };

  const handleOpenBooking = () => {
    navigate(`${id}`);
    setShowButtons(false); // Added to close the menu
  };

  const handleOpenCheckin = () => {
    navigate(`/checkin/${id}`);
    setShowButtons(false); // Added to close the menu
  };

  const handleCheckout = () => {
    updateCheckoutDetails(id);
    setShowButtons(false);
  };

  return (
    <div
      className={`${
        isUpdating ? `grayscale opacity-50 cursor-not-allowed` : ``
      }`}
    >
      <div className="select-none bg-white flex items-center justify-between py-3 w-full border-b font-semibold border-gray-200 transition-all relative">
        <div className="ms-10 w-1/12 text-center text-[15px]">
          {cabins.name}
        </div>
        <div className="w-1/6 text-center text-[15px]">
          <div>
            <p>{guests.fullName}</p>
            <p className="text-xs text-gray-600 mt-1">{guests.email}</p>
          </div>
        </div>
        <div className="w-1/5 text-center text-[15px]">
          <div>
            <p>
              {isToday(startDate) ? "Today" : getDaysUntilNow(startDate)} days
              ago <span>→</span> {numNights} night stay
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {formatDate(startDate)} <span>—</span> {formatDate(endDate)}
            </p>
          </div>
        </div>
        <div className="w-1/6 text-center text-[15px]">
          {status === "unconfirmed" && (
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase text-xs">
              unconfirmed
            </span>
          )}
          {status === "checked-in" && (
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full uppercase text-xs">
              checked in
            </span>
          )}
          {status === "checked-out" && (
            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full uppercase text-xs">
              checked out
            </span>
          )}
        </div>
        <div className="w-1/6 text-center text-[15px]">
          <div>{formatToINR(totalPrice)}</div>
        </div>
        <div className="w-1/6 text-center text-sm relative z-50">
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
              className="w-40 absolute top-0 right-[8rem] bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-gray-200"
            >
              <button
                onClick={handleOpenBooking}
                className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-all active:scale-95"
              >
                <FaRegEye className="text-gray-500 text-2xl" />
                See details
              </button>
              {status === "checked-in" ? (
                <button
                  onClick={handleCheckout}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-all active:scale-95"
                >
                  <MdLogout className="text-gray-500 text-2xl font-bold" />
                  Check out
                </button>
              ) : (
                <button
                  onClick={handleOpenCheckin}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-all active:scale-95"
                >
                  <MdLogin className="text-gray-500 text-2xl font-bold" />
                  Check in
                </button>
              )}
              <button
                onClick={() => {
                  setOpenDeleteModal(true);
                  setShowButtons(false);
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-all active:scale-95"
              >
                <FiTrash2 className="text-xl text-red-500" />
                Delete
              </button>
            </div>
          )}
          {openDeleteModal && (
            <div
              onClick={handleCloseDeleteModal}
              className="modal-overlay h-screen w-full backdrop-blur-sm bg-black bg-opacity-20 fixed inset-0 z-50"
            >
              <ConfirmDeleteBooking
                id={id}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRow;
