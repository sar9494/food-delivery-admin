"use client";

import React, { createContext, useContext, useState } from "react";

type LoaderContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const LoaderContext = createContext<LoaderContextType>({} as LoaderContextType);
export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoaderContext.Provider
      value={{
        isLoading: isLoading,
        setIsLoading: setIsLoading,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};
export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    console.log("context is not defined");
  }
  return context;
};
