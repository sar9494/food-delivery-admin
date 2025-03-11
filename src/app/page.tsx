"use client";
import { HomeNaviagtion } from "@/components/index";
import { AllOrders } from "@/app/(orders)/_features/AllOrders";
import { Dishes } from "./(food-menu)/_features/Dishes";
import { Profile } from "@/components/Profile";
export default function Home() {
  return (
    <div className="flex">
      <HomeNaviagtion />
      <div className="w-full p-5 bg-gray-100">
        <div className="w-full flex justify-end px-5">
          <Profile />
        </div>
        {/* <AllOrders /> */}
        <Dishes />
      </div>
    </div>
  );
}
