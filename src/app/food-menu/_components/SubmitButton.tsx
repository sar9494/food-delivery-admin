import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SubmitButton = (props: { isPending: boolean; place: string }) => {
  const { isPending, place } = props;
  return (
    <Button
      type="submit"
      className={cn(
        "bg-red-500 hover:bg-red-600 text-white",
        place == "add" && "w-full"
      )}
      disabled={isPending}
    >
      {place == "add"
        ? isPending
          ? "Adding..."
          : "Add"
        : isPending
        ? "Uploading..."
        : "Update"}
    </Button>
  );
};
