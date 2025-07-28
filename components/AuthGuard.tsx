"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "./ui/Spinner"; // Spinner-mu tetap kita pakai

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  
  // Gunakan useSession dengan opsi `required: true`
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // Jika user tidak terotentikasi, paksa redirect ke halaman utama
      router.push("/");
    },
  });

  // Selama sesi masih dicek (loading), tampilkan spinner
  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Jika status sudah 'authenticated', tampilkan konten halaman
  return <>{children}</>;
};