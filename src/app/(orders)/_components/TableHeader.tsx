import { Checkbox } from "@/components/ui/checkbox";
import { ChevronsUpDown } from "lucide-react";
export const TableHeader = () => {
  return (
    <div className="flex items-center  w-full">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full"
      >
        <div className=" flex justify-around w-full">
          <p>№</p>
          <p>Customer</p>
          <p>Food</p>
          <button className="flex">
            Date <ChevronsUpDown size={15} />
          </button>
          <p>Total</p>
          <p>Delivery address</p>
          <p>Delivery state</p>
        </div>
      </label>
    </div>
  );
};
