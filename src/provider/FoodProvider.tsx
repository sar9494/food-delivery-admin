"use client";
import axios from "axios";
import React, { useState, createContext, useContext, useEffect } from "react";
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
type FoodContextType = {
  foods: Food[];
  getFoods: () => void;
};
const FoodContext = createContext<FoodContextType>({} as FoodContextType);
export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [foods, setFoods] = useState<Food[]>([]);

  const getFoodInfo = async () => {
    const response = await axios.get("http://localhost:4000/foods");
    setFoods(response.data);
  };
  useEffect(() => {
    getFoodInfo();
  }, []);
  return (
    <FoodContext.Provider
      value={{
        foods: foods,
        getFoods: getFoodInfo,
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
