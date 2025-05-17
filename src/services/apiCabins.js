import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
};

export const createEditCabin = async (newCabin, id) => {
  try {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl); // Changed to supabaseUrl assuming that's the correct variable
    let imagePath = newCabin.image; // Default to existing image path

    // Only process image upload if there's no existing path
    if (!hasImagePath && newCabin.image) {
      const imageName = `${Date.now()}-${newCabin.image.name}`.replace(/\//g, "");
      
      const { data: imageData, error: uploadError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

      if (uploadError) {
        throw new Error("Cabin image could not be uploaded.");
      }

      imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    }

    let query = supabase.from("cabins");

    if (!id) {
      query = query.insert([{ ...newCabin, image: imagePath }]);
    }

    if (id) {
      query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    }

    const { data, error } = await query.select().single();

    if (error) {
      console.log(error);
      throw new Error("Cabin could not be created.");
    }

    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};