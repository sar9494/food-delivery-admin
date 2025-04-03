"use client";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext } from "react";
export type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: {
    name: string;
    id: string;
  };
};
export type FoodSchema = {
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  id: string;
  category: string;
};
type FoodContextType = {
  foods: Food[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
  isLoading: boolean;
  deleteFood: (param: { id: string }) => Promise<unknown>;
  updateFoodInfo: (newInfo: FoodSchema) => Promise<unknown>;
};
const FoodContext = createContext<FoodContextType>({} as FoodContextType);
export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: foods,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const response = await axios.get(
        "https://food-delivery-service-bx3v.onrender.com/foods"
      );
      return response.data;
    },
  });

  const deleteFood = async (param: { id: string }) => {
    const response = await axios.delete(
      "https://food-delivery-service-bx3v.onrender.com/foods",
      {
        data: param,
      }
    );
    await refetch();
    return response.data;
  };
  const updateFoodInfo = async (newInfo: FoodSchema) => {
    console.log(newInfo);
    try {
      const response = await axios.put(
        "https://food-delivery-service-bx3v.onrender.com/foods",
        newInfo
      );
      console.log(response.data);
      await refetch();
      return response.data;
    } catch (error) {
      console.log("Error when updating food info", error);
    } finally {
    }
  };
  return (
    <FoodContext.Provider
      value={{
        foods: foods,
        refetch: refetch,
        isLoading: isLoading,
        deleteFood: deleteFood,
        updateFoodInfo: updateFoodInfo,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    console.log("context is not defined");
  }
  return context;
};
