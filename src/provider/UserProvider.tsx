"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
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
  }) => Promise<unknown>;
  getUser: (id: { id: string }) => Promise<unknown>;
};
const UserContext = createContext<UserContextType>({} as UserContextType);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: user } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const response = await axios.get(
        "https://food-delivery-service-bx3v.onrender.com/user"
      );
      return response.data;
    },
  });

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
      await axios.put(
        "https://food-delivery-service-bx3v.onrender.com/user",
        values
      );
    } catch (error) {
      console.log(error);
    }
  };
  const gerUser = async (id: { id: string }) => {
    try {
      const response = await axios.post(
        "https://food-delivery-service-bx3v.onrender.com/user",
        {
          id: id,
        }
      );
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
      {user ? <div>...loading</div> : children}
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
