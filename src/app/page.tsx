"use client";
import { HomeNaviagtion } from "@/components/index";
import { AllOrders } from "@/app/(orders)/_features/AllOrders";

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
