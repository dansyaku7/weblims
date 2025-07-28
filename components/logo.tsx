import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/images/logo-delta.png"
      alt="Logo Delta"
      width={0}
      height={0}
      sizes="100vw"
      className={cn("w-18 h-auto", className)}
      priority
    />
  );
};
