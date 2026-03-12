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

    } catch (error) {
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

  // Visual Overlay untuk kepanikan
  const getBackgroundStyle = () => {
    if (systemStatus === "DANGER") return "bg-red-950/20 shadow-[inset_0_0_150px_rgba(239,68,68,0.15)]";
    if (systemStatus === "WARNING") return "bg-amber-950/20 shadow-[inset_0_0_150px_rgba(245,158,11,0.1)]";
    return "bg-black";
  };

  return (
    <main className={`flex-1 space-y-6 p-6 md:p-10 min-h-screen transition-all duration-500 ${getBackgroundStyle()} text-slate-200`}>
      
      {/* GLOBAL ALERT BANNER */}
      {systemStatus === "DANGER" && (
        <div className="w-full bg-red-600 border border-red-500 p-4 rounded-xl flex items-center justify-center gap-3 animate-pulse shadow-lg shadow-red-500/20">
          <Flame className="h-8 w-8 text-white" />
          <h1 className="text-white text-2xl font-black tracking-widest uppercase">BAHAYA! INDIKASI KEBAKARAN TERDETEKSI!</h1>
          <Flame className="h-8 w-8 text-white" />
        </div>
      )}

      {systemStatus === "WARNING" && (
        <div className="w-full bg-amber-600/90 border border-amber-500 p-3 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-amber-500/10">
          <AlertTriangle className="h-6 w-6 text-white" />
          <h1 className="text-white text-lg font-bold tracking-wide uppercase">WASPADA: ANOMALI GAS ATAU SUHU RUANGAN</h1>
        </div>
      )}

      {systemStatus === "NORMAL" && (
        <div className="w-full bg-emerald-950/30 border border-emerald-900/50 p-3 rounded-xl flex items-center justify-center gap-3">
          <CheckCircle className="h-5 w-5 text-emerald-500" />
          <h1 className="text-emerald-500 text-sm font-bold tracking-widest uppercase">Status Aman: Tidak Ada Anomali Lingkungan</h1>
        </div>
      )}

      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Lab Monitoring <span className="text-emerald-500">Node</span></h2>
          <p className="text-zinc-400 mt-1">Real-time deteksi anomali ruangan sensor suhu, MQ2, dan Flame.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 bg-zinc-900/50 px-5 py-3 rounded-xl border border-zinc-800 backdrop-blur-sm shadow-xl">
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Device (ESP32)</span>
            {deviceStatus === "ONLINE" ? (
              <span className="flex items-center text-emerald-500 font-bold text-sm gap-1.5"><Wifi className="h-4 w-4" /> Online</span>
            ) : (
              <span className="flex items-center text-red-500 font-bold text-sm gap-1.5"><WifiOff className="h-4 w-4" /> Offline</span>
            )}
          </div>
          <div className="h-10 w-px bg-zinc-800 mx-2 hidden sm:block"></div>
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">System Status</span>
            {systemStatus === "NORMAL" && <span className="flex items-center text-emerald-500 font-bold text-sm gap-1.5"><CheckCircle className="h-4 w-4" /> Normal</span>}
            {systemStatus === "WARNING" && <span className="flex items-center text-amber-500 font-bold text-sm gap-1.5"><AlertTriangle className="h-4 w-4" /> Waspada</span>}
            {systemStatus === "DANGER" && <span className="flex items-center text-red-500 font-bold text-sm gap-1.5 animate-pulse"><Flame className="h-4 w-4" /> KEBAKARAN</span>}
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

      <StatCards data={sensorData} />
      <MonitoringTable logs={logs} />
    </main>
  );
}