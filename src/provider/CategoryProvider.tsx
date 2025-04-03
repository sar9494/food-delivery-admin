"use client";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext } from "react";
export type Category = {
  categoryName: string;
  _id: string;
  foodCount: number;
};
type CategoryContextType = {
  categories: Category[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
  isLoading: boolean;
  addCategory: ({ categoryName }: { categoryName: string }) => void;
};
const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);
export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: catList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(
        "https://food-delivery-service-bx3v.onrender.com/category"
      );
      return response.data;
    },
  });
  const addCategory = async ({ categoryName }: { categoryName: string }) => {
    await axios.post(
      "https://food-delivery-service-bx3v.onrender.com/category",
      {
        categoryName: categoryName,
      }
    );
    await refetch();
  };

  return (
    <CategoryContext.Provider
      value={{
        categories: catList,
        refetch: refetch,
        isLoading: isLoading,
        addCategory: addCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    console.log("context is not defined");
  }
  return context;
};
