import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[80rem] px-6 md:px-10", className)}
      {...props}
    />
  );
}
