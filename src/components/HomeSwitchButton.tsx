import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Truck, LayoutDashboard, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
export const HomeSwitchButton = ({ name }: { name: string }) => {
  const pathName = usePathname();
  return (
    <Link href={name}>
      <Button
        className={cn(
          "flex w-full rounded-full bg-white text-black",
          pathName.includes(name) && "bg-black text-white"
        )}
      >
        {name.includes("food") && (
          <>
            <LayoutDashboard />
            <p>Food menu</p>
          </>
        )}
        {name.includes("order") && (
          <>
            <Truck />
            <p>Order</p>
          </>
        )}
        {name.includes("settings") && (
          <>
            <Settings />
            <p>Settings</p>
          </>
        )}
      </Button>
    </Link>
  );
};
