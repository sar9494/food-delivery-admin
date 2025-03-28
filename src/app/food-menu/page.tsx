"use client";

import { FoodProvider } from "@/provider/FoodProvider";
import { Categories } from "./_features/Categories";
import { Dishes } from "./_features/Dishes";
import { CategoryProvider } from "@/provider/CategoryProvider";
export default function Home() {
  return (
    <CategoryProvider>
      <FoodProvider>
        <div className="flex flex-col gap-5 pt-5">
          <Categories />
          <Dishes />
        </div>
      </FoodProvider>
    </CategoryProvider>
  );
}
