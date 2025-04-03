"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrder } from "@/provider/OrderProvider";
import { useLoader } from "@/provider/LoadingProvider";
import { useState } from "react";

const frameworks = [
  {
    value: "DELIVERED",
    label: "DELIVERED",
  },
  {
    value: "PENDING",
    label: "PENDING",
  },
  {
    value: "CANCELED",
    label: "CANCELED",
  },
];

export const UpdateStatusModal = (props: { status: string; id: string }) => {
  const { status, id } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(status);
  const { updateStatus } = useOrder();
  const { isLoading } = useLoader();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[150px] justify-between rounded-full bg-transparent text-black border",
            value === "PENDING" && "border-red-500",
            value === "DELIVERED" && "border-green-500",
            value === "CANCELED" && "border-gray-500"
          )}
        >
          {isLoading && open ? (
            <div>...Uploading</div>
          ) : (
            <div className="flex justify-between w-full">
              {value
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : props.status}
              <ChevronsUpDown className="opacity-50" />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]">
        <Command>
          <CommandList>
            <CommandGroup>
              {frameworks.map((framework) => (
                <div key={framework.value}>
                  <CommandItem
                    value={framework.value}
                    onSelect={async (currentValue) => {
                      if (value !== currentValue) {
                        await updateStatus({ status: framework.value, id: id });
                        setValue(currentValue === value ? "" : currentValue);
                      }
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
