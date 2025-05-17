import React from "react";
import UpdateSettingForm from "../features/settings/UpdateSettingForm";
import { useSettings } from "../features/settings/useSettings";
import Loader from "../ui/Loader";

const Settings = () => {
  const { isPending, settings = {}, error } = useSettings();

  if (isPending) return <Loader />;
  return (
    <div className="flex flex-col h-full select-none">
      <h1 className="font-bold text-3xl text-gray-800">Settings</h1>
      <div className="bg-white w-[700px] flex items-center justify-center p-10 mt-10 rounded-lg">
        <UpdateSettingForm />
      </div>
    </div>
  );
};

export default Settings;
