"use client";

import React, { useState, useEffect } from "react";
import { Wifi, WifiOff, CheckCircle, AlertTriangle, Flame, RefreshCw } from "lucide-react";
import StatCards from "./components/StatCards";
import MonitoringTable from "./components/MonitoringTable";

export const dynamic = 'force-dynamic';

export default function MonitoringPage() {
  const [deviceStatus, setDeviceStatus] = useState<"ONLINE" | "OFFLINE">("OFFLINE");
  const [systemStatus, setSystemStatus] = useState<"NORMAL" | "WARNING" | "DANGER">("NORMAL");
  const [lastUpdate, setLastUpdate] = useState<string>("Menunggu data...");
  const [isLoading, setIsLoading] = useState(false);
  const [sensorData, setSensorData] = useState<any>({});
  const [logs, setLogs] = useState<any[]>([]);

  const fetchMonitoringData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sensor');
      if (!response.ok) throw new Error("Gagal fetch");

      const data = await response.json();
      setSensorData(data.latest);
      setLogs(data.history);

      const lastUpdateDate = new Date(data.latest.last_update);
      const diffSeconds = (new Date().getTime() - lastUpdateDate.getTime()) / 1000;

      setDeviceStatus(diffSeconds < 5 ? "ONLINE" : "OFFLINE");
      setLastUpdate(lastUpdateDate.toLocaleTimeString());
      setSystemStatus(data.latest.status_sistem || "NORMAL");
    } catch {
      setDeviceStatus("OFFLINE");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitoringData();
    const interval = setInterval(fetchMonitoringData, 2000);
    return () => clearInterval(interval);
  }, []);

  const getBgStyle = () => {
    if (systemStatus === "DANGER") return "bg-red-950/20";
    if (systemStatus === "WARNING") return "bg-amber-950/10";
    return "bg-[#0a0c0f]";
  };

  return (
    <main className={`flex-1 min-h-screen p-6 md:p-10 space-y-5 transition-colors duration-500 ${getBgStyle()} text-slate-200`}>

      {/* ALERT BANNER */}
      {systemStatus === "DANGER" && (
        <div className="w-full rounded-xl border border-red-800 border-l-4 border-l-red-500 bg-red-950/40 px-5 py-3.5 flex items-center gap-3 animate-pulse">
          <Flame className="h-5 w-5 text-red-400 flex-shrink-0" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-red-300">
            Bahaya! Indikasi Kebakaran Terdeteksi!
          </span>
        </div>
      )}

      {systemStatus === "WARNING" && (
        <div className="w-full rounded-xl border border-amber-800 border-l-4 border-l-amber-500 bg-amber-950/30 px-5 py-3.5 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-amber-300">
            Waspada: Anomali Gas atau Suhu Ruangan
          </span>
        </div>
      )}

      {systemStatus === "NORMAL" && (
        <div className="w-full rounded-xl border border-emerald-900/50 border-l-4 border-l-emerald-500 bg-emerald-950/20 px-5 py-3 flex items-center gap-3">
          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-500">
            Status Aman: Tidak Ada Anomali Lingkungan
          </span>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-5">
        <div>
          <h2 className="text-[26px] font-extrabold tracking-tight text-white">
            Lab Monitoring <span className="text-emerald-400">Node</span>
          </h2>
          <p className="font-mono text-[11px] text-zinc-600 mt-1">
            // real-time · suhu · mq2 · flame · 2s interval
          </p>
        </div>

        {/* STATUS BAR */}
        <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-3 flex-wrap gap-y-2">
          {/* Device */}
          <div className="flex flex-col px-4 first:pl-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600 mb-1">Device (ESP32)</span>
            {deviceStatus === "ONLINE" ? (
              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <Wifi className="h-3 w-3" /> Online
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                <WifiOff className="h-3 w-3" /> Offline
              </span>
            )}
          </div>

          <div className="hidden sm:block h-8 w-px bg-zinc-800 mx-1" />

          {/* System Status */}
          <div className="flex flex-col px-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600 mb-1">System Status</span>
            {systemStatus === "NORMAL" && (
              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Normal
              </span>
            )}
            {systemStatus === "WARNING" && (
              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-amber-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Waspada
              </span>
            )}
            {systemStatus === "DANGER" && (
              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-red-400 animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" /> Kebakaran
              </span>
            )}
          </div>

          <div className="hidden sm:block h-8 w-px bg-zinc-800 mx-1" />

          {/* Last Update */}
          <div className="flex flex-col px-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600 mb-1">Last Update</span>
            <span className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
              <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin text-emerald-400" : "text-zinc-600"}`} />
              {lastUpdate}
            </span>
          </div>
        </div>
      </div>

      <StatCards data={sensorData} />
      <MonitoringTable logs={logs} />
    </main>
  );
}