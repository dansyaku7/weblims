"use client";

import React, { useState, useEffect } from "react";
import { Wifi, WifiOff, CheckCircle, AlertTriangle, Flame, RefreshCw } from "lucide-react";
import StatCards from "./components/StatCards";
import MonitoringTable from "./components/MonitoringTable";

export default function MonitoringPage() {
  const [deviceStatus, setDeviceStatus] = useState<"ONLINE" | "OFFLINE">("ONLINE");
  const [systemStatus, setSystemStatus] = useState<"NORMAL" | "WARNING" | "DANGER">("NORMAL");
  const [lastUpdate, setLastUpdate] = useState<string>("Baru saja");
  const [isLoading, setIsLoading] = useState(false);

  // Simulasi Auto-refresh
  const fetchMonitoringData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLastUpdate(new Date().toLocaleTimeString());
    setIsLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(fetchMonitoringData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex-1 space-y-6 p-6 md:p-10 min-h-screen bg-black text-slate-200">
      {/* HEADER & STATUS BAR */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Lab Monitoring <span className="text-emerald-500">Node</span></h2>
          <p className="text-zinc-400 mt-1">Real-time deteksi anomali ruangan sensor suhu, MQ2, dan Flame.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 bg-zinc-900/50 px-5 py-3 rounded-xl border border-zinc-800 backdrop-blur-sm">
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Device (ESP32)</span>
            {deviceStatus === "ONLINE" ? (
              <span className="flex items-center text-emerald-500 font-bold text-sm gap-1.5">
                <Wifi className="h-4 w-4" /> Online
              </span>
            ) : (
              <span className="flex items-center text-red-500 font-bold text-sm gap-1.5">
                <WifiOff className="h-4 w-4" /> Offline
              </span>
            )}
          </div>
          
          <div className="h-10 w-px bg-zinc-800 mx-2 hidden sm:block"></div>
          
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">System Status</span>
            {systemStatus === "NORMAL" && (
              <span className="flex items-center text-emerald-500 font-bold text-sm gap-1.5">
                <CheckCircle className="h-4 w-4" /> Normal
              </span>
            )}
            {systemStatus === "WARNING" && (
              <span className="flex items-center text-amber-500 font-bold text-sm gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Waspada
              </span>
            )}
            {systemStatus === "DANGER" && (
              <span className="flex items-center text-red-500 font-bold text-sm gap-1.5 animate-pulse">
                <Flame className="h-4 w-4" /> KEBAKARAN
              </span>
            )}
          </div>

          <div className="h-10 w-px bg-zinc-800 mx-2 hidden sm:block"></div>
          
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Update Terakhir</span>
            <span className="flex items-center font-mono font-semibold text-zinc-300 text-sm gap-1.5">
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-emerald-500" : ""}`} /> 
              {lastUpdate}
            </span>
          </div>
        </div>
      </div>

      {/* COMPONENT: 3 CARDS */}
      <StatCards />

      {/* COMPONENT: TABLE (Riwayat Log) */}
      <MonitoringTable />
    </main>
  );
}