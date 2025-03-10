import { ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Orders } from "@/utils/ordersType";
export const OrderTable = (props: Orders) => {
  const { numeration, customer, date, food, total, address, deliveryState } =
    props;
  return (
    <div className="flex">
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
          {/* <DateButton /> */}
          <p>Total</p>
          <p>Delivery address</p>
          <p>Delivery state</p>
        </div>
      </label>
    </div>
  );
};
