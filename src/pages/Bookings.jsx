import React, { useState } from "react";
import BookingTable from "../features/bookings/BookingTable";
import { useBookings } from "../features/bookings/useBookings";
import Loader from "../ui/Loader";
import BookingModal from "../ui/BookingModal";
import CreateBookingForm from "../features/bookings/CreateBookingForm";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import { useSearchParams } from "react-router-dom";
import SortBookings from "../features/bookings/SortBookings";

const Bookings = () => {
  const { isPending, bookings } = useBookings();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchParams] = useSearchParams();

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsOpenModal(false);
    }
  };

  if (isPending) return <Loader />;

  const bookingsArray = Array.isArray(bookings) ? bookings : [];

  const filterValue = searchParams.get("discount") || "all";
  const sortValue = searchParams.get("sortBy") || "date-recent";

  let filteredBookings = [];
  if (filterValue === "all") {
    filteredBookings = bookingsArray;
  } else if (filterValue === "checked-in") {
    filteredBookings = bookingsArray.filter(
      (booking) => booking.status === "checked-in"
    );
  } else if (filterValue === "checked-out") {
    filteredBookings = bookingsArray.filter(
      (booking) => booking.status === "checked-out"
    );
  } else if (filterValue === "unconfirmed") {
    filteredBookings = bookingsArray.filter(
      (booking) => booking.status === "unconfirmed"
    );
  }

  let sortedBookings = [...filteredBookings];
  if (sortValue === "date-recent") {
    sortedBookings.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (sortValue === "date-earlier") {
    sortedBookings.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  } else if (sortValue === "amount-high") {
    sortedBookings.sort((a, b) => b.totalPrice - a.totalPrice);
  } else if (sortValue === "amount-low") {
    sortedBookings.sort((a, b) => a.totalPrice - b.totalPrice);
  }

  return (
    <div className="flex flex-col w-full h-full select-none">
      <div className="flex items-center justify-between w-full mb-5">
        <h1 className="font-bold text-3xl text-gray-800">Bookings</h1>
        <div className="me-10 flex gap-5 font-semibold">
          <BookingTableOperations />
          <SortBookings />
        </div>
      </div>
      <BookingTable filteredBookings={sortedBookings} />
      {isOpenModal && (
        <div
          onClick={handleCloseModal}
          className="modal-overlay fixed inset-0 h-screen w-full backdrop-blur-sm bg-black bg-opacity-20 z-50"
        >
          <BookingModal setIsOpenModal={setIsOpenModal}>
            <CreateBookingForm setIsOpenModal={setIsOpenModal} />
          </BookingModal>
        </div>
      )}
    </div>
  );
};

export default Bookings;
