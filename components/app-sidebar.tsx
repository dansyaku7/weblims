// Lokasi: app/component/app-sidebar.tsx

"use client";

import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import {
  IconCertificate2,
  IconDashboard,
  IconDatabase,
  IconNews,
} from "@tabler/icons-react";
import { FileText, FormInput, UserPlus } from "lucide-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react"; // 1. Ganti useAuth menjadi useSession

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // 2. Ambil data sesi dari NextAuth
  const { data: session } = useSession(); 
  const userRole = session?.user?.role; // Ambil role dari sesi

  // ... (definisi allNavMain dan allDocuments tetap sama) ...
   const allNavMain = [
    {
      title: "Dashboard",
      url: "/overview",
      icon: IconDashboard as any,
      roles: ["SUPER_ADMIN"], 
    },
    {
      title: "Form Pendaftaran",
      url: "/registration",
      icon: FormInput as any,
      roles: ["SUPER_ADMIN"],
    },
    {
      title: "Surat Tugas",
      url: "/surat",
      icon: UserPlus as any,
      roles: ["SUPER_ADMIN"],
    },
    {
      title: "Surat Tugas Pengujian",
      url: "/pengujian",
      icon: FileText as any,
      roles: ["SUPER_ADMIN"],
    },
    {
      title: "Berita Acara",
      url: "/berita",
      icon: IconNews as any,
      roles: ["SUPER_ADMIN"],
    },
  ];

  const allDocuments = [
    {
      name: "Data Library",
      url: "/library",
      icon: IconDatabase as any,
      roles: ["SUPER_ADMIN", "ANALIS"], 
    },
    {
      name: "Certificates Of Analysis",
      url: "/coa",
      icon: IconCertificate2 as any,
      roles: ["SUPER_ADMIN", "ANALIS"],
    },
  ];


  // 3. Filter menu berdasarkan userRole dari sesi
  const navMain = allNavMain.filter((item) =>
    item.roles.includes(userRole || "")
  );

  const documents = allDocuments.filter((item) =>
    item.roles.includes(userRole || "")
  );

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        {/* ... (Header tidak berubah) ... */}
      </SidebarHeader>

      <SidebarContent>
        {navMain.length > 0 && <NavMain items={navMain} />}
        {navMain.length > 0 && documents.length > 0 && (
          <div className="my-2 border-t border-border" />
        )}
        {documents.length > 0 && <NavDocuments items={documents} />}
      </SidebarContent>

      <SidebarFooter>
        {/* NavUser kemungkinan perlu diubah juga untuk menggunakan useSession */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}