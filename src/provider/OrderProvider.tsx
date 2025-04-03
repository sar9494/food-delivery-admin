"use client";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext } from "react";
import { useLoader } from "./LoadingProvider";
export type Order = {
  user: string;
  id: string;
  totalPrice: number;
  createdAt: Date;
  foodOrderItems: { foodName: string; quantity: number; image: string }[];
  status: string;
  address: string;
};
type OrderContextType = {
  orders: Order[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  updateStatus: (newStatus: { status: string; id: string }) => Promise<void>;
};
const OrderContext = createContext<OrderContextType>({} as OrderContextType);
export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const { setIsLoading } = useLoader();
  const { data: orderList, refetch } = useQuery({
    queryKey: ["foodOrders"],
    queryFn: async () => {
      setIsLoading(true);
      const response = await axios.get(
        "https://food-delivery-service-bx3v.onrender.com/foodOrders"
      );
      setIsLoading(false);
      return response.data;
    },
  });
  const updateStatus = async (newStatus: { status: string; id: string }) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        "https://food-delivery-service-bx3v.onrender.com/foodOrders",
        newStatus
      );
      await refetch();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <OrderContext.Provider
      value={{
        orders: orderList,
        refetch: refetch,
        updateStatus: updateStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    console.log("context is not defined");
  }
  return context;
};
