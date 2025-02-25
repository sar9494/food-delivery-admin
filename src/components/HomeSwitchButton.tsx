import { Button } from "./ui/button";
import { Truck, LayoutDashboard, Settings } from "lucide-react";

export const HomeSwitchButton = ({ name }: { name: string }) => {
  return (
    <Button className="flex w-full rounded-full">
      {name === "food" && (
        <>
          <LayoutDashboard />
          <p>Food menu</p>
        </>
      )}
      {name === "order" && (
        <>
          <Truck />
          <p>Order</p>
        </>
      )}
      {name === "settings" && (
        <>
          <Settings />
          <p>Settings</p>
        </>
      )}
    </Button>
  );
};
