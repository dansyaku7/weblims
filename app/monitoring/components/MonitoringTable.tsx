"use client";

import React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

// DUMMY DATA SEMENTARA - Diubah jadi LOG WAKTU untuk 1 Lab
const dummyLogs = [
  { time: "20:45:12", date: "28 Feb 2026", smoke: "Normal", heat: "24.5°C", glass: "Aman", status: "Normal" },
  { time: "20:40:05", date: "28 Feb 2026", smoke: "Normal", heat: "24.4°C", glass: "Aman", status: "Normal" },
  { time: "20:35:10", date: "28 Feb 2026", smoke: "Terdeteksi", heat: "32.1°C", glass: "Aman", status: "Warning" },
  { time: "20:30:00", date: "28 Feb 2026", smoke: "Normal", heat: "23.8°C", glass: "Aman", status: "Normal" },
];

export default function MonitoringTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Normal":
        return <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">Normal</Badge>;
      case "Danger":
        return <Badge className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">Bahaya</Badge>;
      case "Warning":
        return <Badge className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]">Waspada</Badge>;
      default:
        return <Badge variant="outline" className="border-zinc-700 text-zinc-300">{status}</Badge>;
    }
  };

  return (
    <Card className="bg-zinc-900/40 border border-zinc-800 shadow-xl overflow-hidden mt-6">
      <CardHeader className="border-b border-zinc-800/50 bg-zinc-900/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <Activity className="h-5 w-5 text-emerald-400" />
          </div>
          <CardTitle className="text-xl font-bold text-white tracking-wide">Riwayat Log Sensor (Laboratorium)</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-zinc-950/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="font-semibold text-zinc-400 h-12 w-[150px]">Tanggal</TableHead>
              <TableHead className="font-semibold text-zinc-400">Waktu</TableHead>
              <TableHead className="font-semibold text-zinc-400">Smoke (MQ2)</TableHead>
              <TableHead className="font-semibold text-zinc-400">Heat Sensor</TableHead>
              <TableHead className="font-semibold text-zinc-400">Breaking Glass</TableHead>
              <TableHead className="font-semibold text-zinc-400 text-right pr-6">Status Sistem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyLogs.map((log, index) => (
              <TableRow key={index} className="border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                <TableCell className="font-medium text-zinc-300">{log.date}</TableCell>
                <TableCell className="text-zinc-400 font-mono">{log.time}</TableCell>
                <TableCell className="text-zinc-300">{log.smoke}</TableCell>
                <TableCell className="text-zinc-300 font-mono">{log.heat}</TableCell>
                <TableCell className="text-zinc-300">{log.glass}</TableCell>
                <TableCell className="text-right pr-6">{getStatusBadge(log.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}