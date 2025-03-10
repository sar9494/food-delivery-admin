import { Checkbox } from "@/components/ui/checkbox";
export const TableHeader = () => {
  return (
    <div className="flex items-center space-x-2 w-full">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full"
      >
        <div className=" flex justify-around w-full bg-gray-300">
          <p>№</p>
          <p>Customer</p>
          <p>Food</p>
          <button></button>
          <p>Total</p>
          <p>Delivery address</p>
          <p>Delivery state</p>
        </div>
      </label>
    </div>
  );
};
