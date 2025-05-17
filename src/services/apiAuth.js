import supabase, { supabaseUrl } from "./supabase";

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    throw new Error("Booking could not be deleted");
  }

  return data;
};

export const logout = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const signup = async ({ fullname, email, password }) => {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullname: fullname,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
};

export const updateUser = async ({ fullname, password, avatar }) => {
  let updateData;
  if (password) updateData = { password };
  if (fullname) updateData = { data: { fullname } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);
  if (storageError) {
    throw new Error(storageError.message);
  }

  const { data: updatedUser, error: error_2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
    },
  });
  if (error_2) {
    throw new Error(error_2.message);
  }

  return updatedUser;
};

export const getCurrentUser = async () => {
  let { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  let { data, error } = await supabase.auth.getUser();
  // console.log(data);

  if (error) {
    console.log(error);
    throw new Error("User could not be loaded");
  }

  return data?.user;
};
