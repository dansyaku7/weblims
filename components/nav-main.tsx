"use client";

import { type Icon } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx"; // Import clsx untuk menggabungkan class dengan lebih mudah

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname.toLowerCase() === item.url.toLowerCase();

            return (
              <SidebarMenuItem key={item.title} className="mb-4">
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  // --- PERUBAHAN UTAMA DI SINI ---
                  className={clsx(
                    // Kelas dasar untuk semua tombol (hover, transisi, dll)
                    "transition-colors duration-200 hover:bg-muted/50", 
                    // Kelas yang hanya aktif jika item ini adalah halaman saat ini
                    isActive && "bg-green-100 text-green-900 font-semibold dark:bg-green-900/30 dark:text-green-50"
                  )}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
