// Made by SyK
"use client";

import React, { useState, useEffect } from "react";
import { Wifi, WifiOff, CheckCircle, AlertTriangle, Flame, RefreshCw, Download } from "lucide-react";
import StatCards from "./components/StatCards";
import MonitoringTable from "./components/MonitoringTable";

export default function MonitoringPage() {
  const [deviceStatus, setDeviceStatus] = useState<"ONLINE" | "OFFLINE">("OFFLINE");
  const [systemStatus, setSystemStatus] = useState<"NORMAL" | "WASPADA" | "BAHAYA">("NORMAL");
  const [lastUpdate, setLastUpdate] = useState<string>("Menunggu data...");
  const [isLoading, setIsLoading] = useState(false);
  const [sensorData, setSensorData] = useState<any>({});
  const [logs, setLogs] = useState<any[]>([]);
  
  // State untuk nutup popup warning
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);

  const fetchMonitoringData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sensor', { cache: 'no-store' });
      if (!response.ok) throw new Error("Gagal fetch");

      const data = await response.json();
      setSensorData(data.latest);
      setLogs(data.history);

      const lastUpdateDate = new Date(data.latest.createdAt);
      const diffSeconds = (new Date().getTime() - lastUpdateDate.getTime()) / 1000;

      setDeviceStatus(diffSeconds < 5 ? "ONLINE" : "OFFLINE");
      setLastUpdate(lastUpdateDate.toLocaleTimeString());
      
      const newStatus = data.latest.statusSistem || "NORMAL";
      setSystemStatus(newStatus);

      // Reset tombol abaikan kalau status udah balik aman
      if (newStatus === "NORMAL") {
        setIsAlertDismissed(false);
      }

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
    if (systemStatus === "BAHAYA") return "bg-red-950/20";
    if (systemStatus === "WASPADA") return "bg-amber-950/10";
    return "bg-[#0a0c0f]";
  };

  // LOGIC RENDER MODAL POPUP
  const renderWarningModal = () => {
    if ((systemStatus === "WASPADA" || systemStatus === "BAHAYA") && !isAlertDismissed && sensorData) {
      const triggers = [];
      const roR = parseFloat(sensorData.rorSuhu || 0);
      const suhu = parseFloat(sensorData.suhuMentah || 0);
      const gas = parseFloat(sensorData.maGas || 0);
      const api = parseInt(sensorData.apiMentah || 4095);

      // Cek satu-satu mana yang biang keroknya (Berdasarkan Golden Threshold C4.5)
      if (roR >= 0.30 || suhu >= 36) {
        triggers.push(`🌡️ Suhu Melonjak Drastis (RoR menyentuh: ${roR.toFixed(2)} °C/s)`);
      }
      if (gas >= 800) {
        triggers.push(`☁️ Terdeteksi Gas Melonjak Drastis (Rata-rata Gas: ${gas} poin)`);
      }
      if (api <= 2500) {
        triggers.push(`🔥 Indikasi Percikan Api Terdeteksi (Nilai Sensor: ${api})`);
      }

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 transition-opacity">
          <div className={`border rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300 ${
            systemStatus === "BAHAYA" ? "bg-red-950/90 border-red-500 shadow-red-900/50" : "bg-amber-950/90 border-amber-500 shadow-amber-900/50"
          }`}>
            <div className="flex flex-col items-center text-center gap-3 mb-6">
              {systemStatus === "BAHAYA" ? (
                <Flame className="h-12 w-12 text-red-500 animate-pulse" />
              ) : (
                <AlertTriangle className="h-12 w-12 text-amber-500 animate-pulse" />
              )}
              <h2 className={`text-2xl font-extrabold uppercase tracking-widest ${systemStatus === "BAHAYA" ? "text-red-400" : "text-amber-400"}`}>
                {systemStatus} TERDETEKSI
              </h2>
            </div>
            
            <div className="space-y-3 mb-6">
              {triggers.length > 0 ? triggers.map((msg, i) => (
                <div key={i} className={`font-mono text-[13px] text-zinc-200 border px-4 py-3 rounded-xl ${
                  systemStatus === "BAHAYA" ? "bg-red-900/40 border-red-500/30" : "bg-amber-900/40 border-amber-500/30"
                }`}>
                  {msg}
                </div>
              )) : (
                <div className="font-mono text-sm text-zinc-200 bg-zinc-800/50 border border-zinc-700 px-4 py-3 rounded-xl text-center">
                  ⚠️ Anomali sensor gabungan membaca pola mencurigakan.
                </div>
              )}
            </div>

            <p className="text-[11px] text-zinc-400 font-mono text-center mb-6 leading-relaxed">
              Segera cek lokasi secara fisik, <br/>dan abaikan peringatan ini jika situasi terkendali.
            </p>

            <button
              onClick={() => setIsAlertDismissed(true)}
              className={`w-full font-bold py-3.5 rounded-xl transition-all ${
                systemStatus === "BAHAYA" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-amber-600 hover:bg-amber-700 text-white"
              }`}
            >
              Tutup & Abaikan
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <main className={`flex-1 min-h-screen p-6 md:p-10 space-y-5 transition-colors duration-500 ${getBgStyle()} text-slate-200`}>
      
      {/* RENDER MODAL DI SINI */}
      {renderWarningModal()}

      {/* ALERT BANNER */}
      {systemStatus === "BAHAYA" && (
        <div className="w-full rounded-xl border border-red-800 border-l-4 border-l-red-500 bg-red-950/40 px-5 py-3.5 flex items-center gap-3 animate-pulse">
          <Flame className="h-5 w-5 text-red-400 flex-shrink-0" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-red-300">
            Bahaya! Indikasi Kebakaran Terdeteksi!
          </span>
        </div>
      )}

      {systemStatus === "WASPADA" && (
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
          <div className="flex items-center gap-4">
            <h2 className="text-[26px] font-extrabold tracking-tight text-white">
              Lab Monitoring <span className="text-emerald-400">Node</span>
            </h2>
            <a 
              href="/api/export" 
              className="flex items-center gap-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors border border-zinc-700"
            >
              <Download className="h-4 w-4" /> Export CSV
            </a>
          </div>
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
            {systemStatus === "WASPADA" && (
              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-amber-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Waspada
              </span>
            )}
            {systemStatus === "BAHAYA" && (
              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-red-400 animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" /> Bahaya
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