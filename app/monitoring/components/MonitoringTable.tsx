"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function MonitoringTable({ logs }: { logs: any[] }) {
  const getStatusBadge = (status: string) => {
    if (status === "NORMAL") return <Badge className="bg-emerald-500/10 text-emerald-400">Normal</Badge>;
    if (status === "DANGER") return <Badge className="bg-red-500/10 text-red-400 animate-pulse">Bahaya</Badge>;
    if (status === "WARNING") return <Badge className="bg-amber-500/10 text-amber-400">Waspada</Badge>;
    return <Badge variant="outline">{status || "Menunggu"}</Badge>;
  };

  return (
    <Card className="bg-zinc-900/40 border border-zinc-800 shadow-xl overflow-hidden mt-6">
      <CardHeader className="border-b border-zinc-800/50 bg-zinc-900/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <Activity className="h-5 w-5 text-emerald-400" />
          </div>
          <CardTitle className="text-xl font-bold text-white tracking-wide">Riwayat Log Sensor 2 Detik</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-zinc-950/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="font-semibold text-zinc-400 h-12">Waktu</TableHead>
              <TableHead className="font-semibold text-zinc-400">Suhu (°C)</TableHead>
              <TableHead className="font-semibold text-zinc-400">RoR (°C/s)</TableHead>
              <TableHead className="font-semibold text-zinc-400">Gas (MQ-2)</TableHead>
              <TableHead className="font-semibold text-zinc-400">Api (Flame)</TableHead>
              <TableHead className="font-semibold text-zinc-400 text-right pr-6">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-zinc-500 py-6">Menunggu sinkronisasi data dari ESP32...</TableCell>
              </TableRow>
            ) : (
              logs.map((log, index) => {
                const dateObj = new Date(log.last_update);
                return (
                  <TableRow key={index} className="border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <TableCell className="text-zinc-400 font-mono">{dateObj.toLocaleTimeString()}</TableCell>
                    <TableCell className="text-zinc-300 font-mono">{parseFloat(log.suhu_mentah).toFixed(1)}</TableCell>
                    <TableCell className="text-zinc-300 font-mono">{parseFloat(log.ror_suhu).toFixed(4)}</TableCell>
                    <TableCell className="text-zinc-300 font-mono">{log.gas_mentah}</TableCell>
                    <TableCell className="text-zinc-300 font-mono">{log.api_mentah}</TableCell>
                    <TableCell className="text-right pr-6">{getStatusBadge(log.status_sistem)}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}