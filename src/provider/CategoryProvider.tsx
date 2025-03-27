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
  ) => Promise<QueryObserverResult<any, Error>>;
  isLoading: boolean;
  addCategory: ({ name }: { name: string }) => void;
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
      const response = await axios.get("http://localhost:4000/category");
      return response.data;
    },
  });
  const addCategory = ({ name }: { name: string }) => {
    const response = axios.post("http://localhost:4000/category", {
      categoryName: name,
    });
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
