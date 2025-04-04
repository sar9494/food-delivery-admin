"use client";
import { HomeNaviagtion } from "@/components";
import { Profile } from "@/components/Profile";
import { AllOrders } from "./_features/AllOrders";
export default function Home() {
  return (
    <div className="flex gap-5">
      <HomeNaviagtion />
      <div>
        <div className="w-full justify-end flex">
          <Profile />
        </div>
        <div className="w-full flex gap-5   bg-gray-100  rounded-xl mt-5 min-h-[850px] p-40 ">
          <AllOrders />
        </div>
      </div>
    </div>
  );
}
