"use client";

import React from "react";
import { Activity } from "lucide-react";

export default function MonitoringTable({ logs }: { logs: any[] }) {
  const getStatusBadge = (status: string) => {
    if (status === "NORMAL")
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Normal
        </span>
      );
    if (status === "DANGER")
      return (
        <span className="inline-flex animate-pulse items-center gap-1.5 rounded-full border border-red-500/25 bg-red-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-red-400">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />Bahaya
        </span>
      );
    if (status === "WARNING")
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-amber-400">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Waspada
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 px-2.5 py-1 font-mono text-[11px] text-zinc-500">
        {status || "Menunggu"}
      </span>
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 mt-4">
      <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-950/40 px-5 py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-emerald-500/20 bg-emerald-500/10">
          <Activity className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <h3 className="text-sm font-bold text-white">Riwayat Log Sensor</h3>
        <span className="ml-auto rounded-full border border-emerald-500/15 bg-emerald-500/10 px-3 py-0.5 font-mono text-[11px] text-emerald-400">
          2s interval
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/60">
              {["Waktu", "Suhu (°C)", "RoR (°C/s)", "Gas (MQ-2)", "Api (Flame)", "Status"].map((h, i) => (
                <th
                  key={h}
                  className={`px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-600 ${i === 5 ? "text-right" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center font-mono text-xs text-zinc-600">
                  // Menunggu sinkronisasi data dari ESP32...
                </td>
              </tr>
            ) : (
              logs.map((log, index) => {
                const dateObj = new Date(log.last_update);
                const isWarning = log.status_sistem === "WARNING";
                const isDanger = log.status_sistem === "DANGER";
                return (
                  <tr
                    key={index}
                    className={`border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/30 ${
                      isDanger ? "bg-red-950/10" : isWarning ? "bg-amber-950/10" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5 font-mono text-xs text-zinc-600">
                      {dateObj.toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-zinc-300">
                      {parseFloat(log.suhu_mentah).toFixed(1)}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-zinc-400">
                      {parseFloat(log.ror_suhu).toFixed(4)}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-zinc-300">{log.gas_mentah}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-zinc-300">{log.api_mentah}</td>
                    <td className="px-4 py-2.5 text-right">{getStatusBadge(log.status_sistem)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}