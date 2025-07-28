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
// 1. Impor ikon 'History' untuk menu riwayat
import { FileText, FormInput, UserPlus, History } from "lucide-react";

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
import { useAuth } from "./context/AuthContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

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
    {
      title: "Riwayat Dokumen",
      url: "/riwayat",
      icon: History as any, // Gunakan ikon History
      roles: ["SUPER_ADMIN"], // Sesuaikan role jika perlu
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

  const navMain = allNavMain.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  const documents = allDocuments.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <Image
                  src="/images/logo-delta.png"
                  alt="Logo Delta"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-18 h-auto"
                  priority
                />
              </Link>
            </SidebarMenuButton>
            <div className="my-2 border-t border-border" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navMain.length > 0 && <NavMain items={navMain} />}
        {navMain.length > 0 && documents.length > 0 && (
          <div className="my-2 border-t border-border" />
        )}
        {documents.length > 0 && <NavDocuments items={documents} />}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
