"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // 1. Import signIn dari NextAuth

export const AuthDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email || !password) {
      toast.error("Email dan password wajib diisi!");
      setIsSubmitting(false);
      return;
    }

    try {
      // 2. Gunakan signIn dari NextAuth, bukan axios.post
      const result = await signIn("credentials", {
        redirect: false, // Penting: agar tidak redirect otomatis
        email,
        password,
      });

      if (result?.error) {
        // Jika ada error dari fungsi authorize (misal: password salah)
        toast.error(result.error);
      } else if (result?.ok) {
        // Jika login berhasil
        toast.success("Login berhasil!");
        router.push("/overview"); // Arahkan ke halaman dashboard
        setOpen(false);
        router.refresh(); // Refresh halaman untuk mengambil data sesi terbaru
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui.");
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast.error("Terjadi kesalahan saat login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};