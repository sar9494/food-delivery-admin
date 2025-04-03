import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrder } from "@/provider/OrderProvider";
import { Checkbox } from "@radix-ui/react-checkbox";
import { UpdateStatusModal } from "../_components/UpdateStatusModal";
import { FoodOrderItems } from "../_components/FoodOrderItems";

export function AllOrders() {
  const { orders } = useOrder();
  console.log(orders);

  return (
    <Table className="w-full">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="w-full">
        <TableRow>
          <TableHead>
            <Checkbox>Check</Checkbox>
          </TableHead>
          <TableHead className="w-[100px]">№</TableHead>
          <TableHead>Customer</TableHead>

          <TableHead>Food</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Delivery address</TableHead>
          <TableHead className="text-right">Delivery state</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full ">
        {orders?.map((order, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <input type="checkbox" id={order.id} />
            </TableCell>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{order.user}</TableCell>
            <TableCell>
              <FoodOrderItems items={order.foodOrderItems} />
            </TableCell>
            <TableCell>{order.createdAt.toString().split("T")[0]}</TableCell>
            <TableCell>{order.totalPrice}</TableCell>

            <TableCell>{order.address}</TableCell>
            <TableCell className="text-right">
              <UpdateStatusModal status={order.status} id={order.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
