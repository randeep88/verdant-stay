import React from "react";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import BtnLoader from "../../ui/BtnLoader";
import { HiOutlineXMark } from "react-icons/hi2";

const CreateCabinForm = ({
  setIsCabinFormOpen,
  setEditingCabin,
  cabinToEdit = {},
}) => {
  const { isCreating, createCabinMutate } = useCreateCabin();
  const { isEditing, editCabinMutate } = useEditCabin();
  const isWorking = isCreating || isEditing;
  console.log(isWorking);
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabinMutate(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            setEditingCabin(null);
            reset();
          },
        }
      );
    } else {
      createCabinMutate(
        { ...data, image: image },
        {
          onSuccess: () => {
            setIsCabinFormOpen(false);
            reset();
          },
        }
      );
    }
  };

  const handleCloseModal = () => {
    setIsCabinFormOpen(false);
    setEditingCabin(null);
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <div className="flex select-none flex-col items-right justify-between pb-5 w-full">
      <div className="m-5 -mb-1 flex justify-end">
        <button onClick={handleCloseModal} disabled={isWorking}>
          <HiOutlineXMark
            className={`${
              isWorking
                ? `text-4xl border border-gray-300 bg-gray-200 transition-all p-2 rounded-lg`
                : `active:scale-95 text-4xl border border-gray-300 hover:bg-gray-200 transition-all p-2 rounded-lg`
            }`}
          />
        </button>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit, onError)}
          className="w-[500px] space-y-4 font-semibold text-[15px]"
        >
          <div className="flex items-center justify-between">
            <label htmlFor="name">Cabin name</label>
            <div className="flex flex-col items-start">
              <input
                disabled={isWorking}
                id="name"
                {...register("name", {
                  required: "This is a required field!",
                })}
                className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
                type="text"
              />
              {errors?.name?.message && (
                <span className="text-red-500 bg-red-50 rounded-full text-xs px-2 mt-1 py-1">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="maxCapacity">Maximum Capacity</label>
            <div className="flex flex-col items-start">
              <input
                disabled={isWorking}
                id="maxCapacity"
                {...register("maxCapacity", {
                  required: "This is a required field!",
                  min: {
                    value: 1,
                    message: "Capacity should be at least 1",
                  },
                })}
                className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
                type="number"
              />
              {errors?.maxCapacity?.message && (
                <span className="text-red-500 bg-red-50 rounded-full text-xs px-2 mt-1 py-1">
                  {errors.maxCapacity.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="regularPrice">Regular Price</label>
            <div className="flex flex-col items-start">
              <input
                disabled={isWorking}
                id="regularPrice"
                {...register("regularPrice", {
                  required: "This is a required field!",
                })}
                className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
                type="number"
              />
              {errors?.regularPrice?.message && (
                <span className="text-red-500 bg-red-50 rounded-full text-xs px-2 mt-1 py-1">
                  {errors.regularPrice.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="discount">Discount</label>
            <div className="flex flex-col items-start">
              <input
                disabled={isWorking}
                id="discount"
                defaultValue={0}
                {...register("discount", {
                  required: "This is a required field!",
                  validate: (value) =>
                    value <= getValues().regularPrice ||
                    "Discount should be less than regular price",
                })}
                className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
                type="number"
              />
              {errors?.discount?.message && (
                <span className="text-red-500 bg-red-50 rounded-full text-xs px-2 mt-1 py-1">
                  {errors.discount.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="description">Description</label>
            <div className="flex flex-col items-start">
              <textarea
                disabled={isWorking}
                id="description"
                {...register("description", {
                  required: "This is a required field!",
                })}
                className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
                type="text"
              />
              {errors?.description?.message && (
                <span className="text-red-500 bg-red-50 rounded-full text-xs px-2 mt-1 py-1">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="image">Cabin Photo</label>
            <div className="flex flex-col items-start">
              <input
                disabled={isWorking}
                accept="image/*"
                id="image"
                {...register("image", {
                  required: isEditSession ? false : "This is a required field!",
                })}
                className={`${
                  isWorking
                    ? `py-2 w-72 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[15px] file:font-semibold file:bg-gray-200 file:text-gray-600`
                    : `py-2 w-72 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[15px] file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200 transition-all`
                } `}
                type="file"
              />
              {errors?.image?.message && (
                <span className="text-red-500 bg-red-50 rounded-full text-xs px-2 mt-1 py-1">
                  {errors.image.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end w-full">
            <div className="flex gap-5 justify-end w-full">
              <button
                onClick={() => {
                  setIsCabinFormOpen(false);
                  setEditingCabin(null);
                }}
                disabled={isWorking}
                type="reset"
                className={`${
                  isWorking
                    ? `cursor-not-allowed px-3 py-2 text-[15px] rounded-md transition-all border-2 border-gray-700 border-opacity-15 text-black opacity-60`
                    : `px-3 active:scale-95 py-2 text-[15px] rounded-md transition-all border-2 border-gray-700 border-opacity-15 text-black hover:bg-opacity-5 hover:bg-gray-700`
                }`}
              >
                Cancel
              </button>
              <button
                disabled={isWorking}
                type="submit"
                className={`${
                  isWorking
                    ? `cursor-not-allowed bg-indigo-400 opacity-60 text-white text-[15px] px-3 py-2 rounded-md transition-all`
                    : `bg-indigo-500 active:scale-95 text-[15px] text-white px-3 py-2 rounded-md transition-all hover:bg-indigo-600`
                } `}
              >
                {isEditSession ? (
                  isWorking ? (
                    <div className="flex items-center gap-2">
                      <BtnLoader />
                      <p>Editing cabin...</p>
                    </div>
                  ) : (
                    "Edit cabin"
                  )
                ) : isWorking ? (
                  <div className="flex items-center gap-2">
                    <BtnLoader />
                    <p>Creating new cabin...</p>
                  </div>
                ) : (
                  "Create new cabin"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCabinForm;
