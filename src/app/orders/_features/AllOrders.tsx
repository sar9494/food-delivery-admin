import { useEffect, useState } from "react";
import { getData } from "@/utils/functions/getOrders";
import { Header } from "../_components/Header";
import { OrderTable } from "../_components/OrderTable";
import { TableHeader } from "../_components/TableHeader";
export const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setOrders(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <TableHeader />
      {/* <OrderTable numeration={1} customer={undefined} date={undefined} food={undefined} total={undefined} address={undefined} deliveryState={undefined}/> */}
    </div>
  );
};
//cloudinary 3keys
