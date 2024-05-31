import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../url.js";
import UserContext from "./userContext.js";
import React from "react";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const res = await axios.get(`${URL}/api/auth/getUser`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    getUser()
  },[])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
