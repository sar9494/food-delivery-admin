"use client";
import { Profile } from "@/components/Profile";
export default function Home() {
  return (
    <div className="flex">
      <div className="w-full p-5 bg-gray-100">
        <div className="w-full flex justify-end px-5">
          <Profile />
        </div>
      </div>
    </div>
  );
}
