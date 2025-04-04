"use client";

import { FoodProvider } from "@/provider/FoodProvider";
import { Categories } from "./_features/Categories";
import { Dishes } from "./_features/Dishes";
import { CategoryProvider } from "@/provider/CategoryProvider";
import { Profile } from "@/components/Profile";
import { HomeNaviagtion } from "@/components";
export default function Home() {
  return (
    <CategoryProvider>
      <FoodProvider>
        <div className="flex  gap-5 pt-5">
          <HomeNaviagtion />
          <div>
            <div className="w-full flex justify-end">
              <Profile />
            </div>
            <Categories />
            <Dishes />
          </div>
        </div>
      </FoodProvider>
    </CategoryProvider>
  );
}
