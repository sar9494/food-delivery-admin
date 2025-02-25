"use client";
import { DateButton } from "../_components/Calendar";
import { Button } from "@/components/ui/button";
export function Header() {
  return (
    <div className="flex justify-between w-full">
      <div>
        <p>
          <b>Orders</b>
        </p>
        <p>sum of items</p>
      </div>
      <div>
        <DateButton />
        <Button>Change delivery state</Button>
      </div>
    </div>
  );
}
