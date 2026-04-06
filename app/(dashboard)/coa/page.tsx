import { Suspense } from "react";
import { getUserFromSession } from "@/lib/session";
import CoaClientPage from "./CoaClientPage"; 
import { Loader2 } from "lucide-react"; // Pastikan lucide-react udah ke-install (kalau belum, pakai <div>Loading...</div> biasa)

export default async function CoaPageWrapper() {
  // 1. Ambil role di Server Component
  const user = await getUserFromSession();
  const userRole = user?.role;

  // 2. Render komponen client dan WAJIB dibungkus Suspense
  return (
    <Suspense 
      fallback={
        <div className="flex flex-col justify-center items-center h-[80vh] space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Memuat data CoA...</p>
        </div>
      }
    >
      <CoaClientPage userRole={userRole} />
    </Suspense>
  );
}