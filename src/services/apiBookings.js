import supabase from "./supabase";
import { getToday } from "../utils/helper.js";

export const getBookings = async () => {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)");

  if (error) {
    console.log(error);
    throw new error("Bookings could not be loaded");
  }
  return bookings;
};
export const getBooking = async (id) => {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new error("Booking could not be loaded");
  }
  return bookings;
};

export const updateCheckin = async (id, breakfast) => {
  if (!id) throw new Error("Booking ID is undefined!");

  const { error } = await supabase
    .from("bookings")
    .update(breakfast)
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { success: true };
};

export const updateCheckout = async (id) => {
  if (!id) throw new Error("Booking ID is undefined!");

  const { error } = await supabase
    .from("bookings")
    .update({ status: "checked-out" })
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { success: true };
};

export const getStaysAfterDate = async (date, endDate = getToday()) => {
  if (!date) {
    throw new Error("Date parameter is required");
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", endDate);

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(`Failed to fetch stays: ${error.message}`);
  }

  return data || [];
};

export const deleteBooking = async (id) => {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
};

export const getBookingsAfterDate = async (date) => {
  if (!date) {
    throw new Error("Date parameter is required");
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("id, created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(`Failed to fetch bookings: ${error.message}`);
  }

  return data || [];
};

export const getStaysTodayActivity = async () => {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);

  const startISO = startOfDay.toISOString();
  const endISO = endOfDay.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.gte.${startISO},startDate.lte.${endISO}),and(status.eq.checked-in,endDate.gte.${startISO},endDate.lte.${endISO})`
    )
    .order("created_at");

  if (error) {
    console.error("Supabase error fetching today's activity:", error);
    throw new Error(`Failed to fetch today's bookings: ${error.message}`);
  }

  return data;
};
