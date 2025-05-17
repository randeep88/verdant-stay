import React from "react";
import "../App.css";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

const Modal = ({ setIsCabinFormOpen, cabinToEdit, setEditingCabin }) => {
  return (
    <div className="modal select-none w-[600px] pb-5 bg-white z-50 shadow-xl rounded-lg text-center">
      <CreateCabinForm
        setIsCabinFormOpen={setIsCabinFormOpen}
        cabinToEdit={cabinToEdit}
        setEditingCabin={setEditingCabin}
      />
    </div>
  );
};

export default Modal;
