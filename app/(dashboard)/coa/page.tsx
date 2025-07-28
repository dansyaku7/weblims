import { getUserFromSession } from "@/lib/session";
import CoaClientPage from "./CoaClientPage"; // Import komponen client

export default async function CoaPageWrapper() {
  // 1. Ambil role di Server Component
  const user = await getUserFromSession();
  const userRole = user?.role;

  // 2. Render komponen client dan kirim 'userRole' sebagai props
  return <CoaClientPage userRole={userRole} />;
}