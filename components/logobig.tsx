import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logobig = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/images/logo-delta-big.png"
      alt="Logo Delta"
      width={200}
      height={200}
      sizes="100vw"
      className={cn("w-18 h-auto", className)}
      priority
    />
  );
};
