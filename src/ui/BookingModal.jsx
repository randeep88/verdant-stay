import React from "react";
import "../App.css";

const BookingModal = ({ children }) => {
  return (
    <div className="modal select-none w-[600px] pb-5 bg-white z-50 shadow-xl rounded-lg text-center">
      {children}
    </div>
  );
};

export default BookingModal;
