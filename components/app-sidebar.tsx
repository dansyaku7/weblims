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
import { useAuth } from "./context/AuthContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Ambil data user yang sedang login dari context
  const { user } = useAuth();

  // Definisikan SEMUA kemungkinan menu beserta role yang diizinkan
  const allNavMain = [
    {
      title: "Dashboard",
      url: "/overview",
      icon: IconDashboard as any,
      roles: ["SUPER_ADMIN"], // Hanya bisa dilihat oleh SUPER_ADMIN
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
      roles: ["SUPER_ADMIN", "ANALIS"], // Bisa dilihat SUPER_ADMIN dan ANALIS
    },
    {
      name: "Certificates Of Analysis",
      url: "/coa",
      icon: IconCertificate2 as any,
      roles: ["SUPER_ADMIN", "ANALIS"],
    },
  ];

  // Filter menu berdasarkan role user yang sedang login
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
        {/* Tampilkan grup menu hanya jika ada item yang boleh dilihat */}
        {navMain.length > 0 && <NavMain items={navMain} />}

        {/* Tampilkan garis pemisah hanya jika kedua grup menu ada */}
        {navMain.length > 0 && documents.length > 0 && (
          <div className="my-2 border-t border-border" />
        )}

        {documents.length > 0 && <NavDocuments items={documents} />}
      </SidebarContent>

      <SidebarFooter>
        {/* NavUser sekarang akan mengambil data dari useAuth secara internal */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
