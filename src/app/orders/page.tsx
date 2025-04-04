"use client";
import { HomeNaviagtion } from "@/components";
import { Profile } from "@/components/Profile";
import { AllOrders } from "./_features/AllOrders";
export default function Home() {
  return (
    <div className="w-full flex gap-5   bg-gray-100  rounded-xl mt-5 min-h-[850px] p-20">
      <HomeNaviagtion />
      <div>
        <div className="w-full flex justify-end">
          <Profile />
        </div>
        <AllOrders />
      </div>
    </div>
  );
}
