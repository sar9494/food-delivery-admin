"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, createContext, useContext, useEffect } from "react";
type UserType = {
  email: string;
  address: string;
  role: string;
  _id: string;
  orderedFoods: string[];
};
type UserContextType = {
  user: UserType;
  handleLogout: () => void;
  updateUserInfo: (values: {
    token: string | null;
    phoneNumber?: number;
    address?: string;
    orderItem?: { food: string; quantity: number };
  }) => Promise<any>;
  getUser: (id: { id: string }) => Promise<any>;
};
const UserContext = createContext<UserContextType>({} as UserContextType);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType>({} as UserType);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      try {
        const response = await gerUser(parsedUser.id);

        setUser(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const updateUserInfo = async (values: {
    token: string | null;
    phoneNumber?: number;
    address?: string;
    orderItem?: { food: string; quantity: number };
  }) => {
    try {
      await axios.put("http://localhost:4000/user", values);
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };
  const gerUser = async (id: { id: string }) => {
    try {
      const response = await axios.post("http://localhost:4000/user", {
        id: id,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        handleLogout: handleLogout,
        updateUserInfo: updateUserInfo,
        getUser: gerUser,
      }}
    >
      {loading && user ? <div>...loading</div> : children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.log("context is not defined");
  }
  return context;
};
