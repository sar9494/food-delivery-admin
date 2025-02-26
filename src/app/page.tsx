"use client";
import { useEffect } from "react";
import { HomeNaviagtion } from "@/components/index";
import { AllOrders } from "@/app/(orders)/_features/AllOrders";
import { LogIn } from "../components/LogIn";

export default function Home() {
  return (
    <div className="flex">
      <HomeNaviagtion />
      <div className="w-full">
        <AllOrders />
      </div>
    </div>
  );
}
