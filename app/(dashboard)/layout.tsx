import { AuthGuard } from "@/components/AuthGuard";
import { AppSidebar } from "@/components/app-sidebar";
// HAPUS BARIS INI: import { AuthProvider } from "@/components/context/AuthContext";
import { LoadingProvider } from "@/components/context/LoadingContext";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      {/* HAPUS WRAPPER <AuthProvider> DARI SINI */}
      <LoadingProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </LoadingProvider>
      {/* DAN DARI SINI */}
    </AuthGuard>
  );
}