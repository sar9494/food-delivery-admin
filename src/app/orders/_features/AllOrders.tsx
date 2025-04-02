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
import { UpdateStatusButton } from "../_components/UpdateStatusButton";
import { FoodOrderItems } from "../_components/FoodOrderItems";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

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
              <UpdateStatusButton status={order.status} id={order.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
