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
  ) => Promise<QueryObserverResult<any, Error>>;
  isLoading: boolean;
  deleteFood: (param: { id: string }) => Promise<any>;
  updateFoodInfo: (newInfo: FoodSchema) => Promise<any>;
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
      const response = await axios.get("http://localhost:4000/foods");
      return response.data;
    },
  });

  const deleteFood = async (param: { id: string }) => {
    const response = await axios.delete("http://localhost:4000/foods", {
      data: param,
    });
    await refetch();
    return response.data;
  };
  const updateFoodInfo = async (newInfo: FoodSchema) => {
    console.log(newInfo);
    try {
      const response = await axios.put("http://localhost:4000/foods", newInfo);
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
