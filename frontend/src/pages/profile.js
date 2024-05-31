import { useContext, useEffect, useState } from "react";
import Navbar from "../components/header";
import UserContext from "../context/userContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex justify-center items-center">
        <div className="border p-3 text-center align-middle flex justify-center md:w-[30%] shadow-2xl shadow-gray-500">
          <div className="flex flex-col space-y-4 justify-center text-center items-start">
            <h1 className="text-xl justify-center text-center font-bold mb-4">Profile</h1>
            <h2 className="text-lg">Username: {user.username}</h2>
            <h2 className="text-lg">Email: {user.email}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
