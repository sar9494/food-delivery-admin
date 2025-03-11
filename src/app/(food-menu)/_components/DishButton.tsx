import { Button } from "@/components/ui/button";
export const DishButton = (props: { name: string; size: number }) => {
  const { name, size } = props;
  return (
    <Button className="bg-white border rounded-full">
      {name}
      <p className="bg-black text-white rounded-full px-2">{size}</p>
    </Button>
  );
};
