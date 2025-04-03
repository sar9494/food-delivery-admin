"use client";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <div className="flex justify-between w-full p-5">
      <div>
        <p>
          <b>Orders</b>
        </p>
        <p>sum of items</p>
      </div>
      <div className="flex  justify-around gap-3">
        <Button className="rounded-full">Change delivery state</Button>
      </div>
    </div>
  );
}
