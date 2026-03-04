"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Thermometer, Flame, CloudFog } from "lucide-react";

export default function StatCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Suhu */}
      <Card className="bg-zinc-900/40 border border-zinc-800 shadow-xl relative overflow-hidden group hover:border-orange-500/50 transition-colors">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase">Suhu Ruangan</p>
              <p className="text-4xl font-extrabold text-white">32.5<span className="text-2xl text-zinc-500 font-medium">°C</span></p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 group-hover:scale-110 transition-transform">
              <Thermometer className="h-6 w-6 text-orange-400" />
            </div>
          </div>
          <div className="mt-5 flex items-center text-sm">
            <span className="text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20 mr-3">Aman</span>
            <span className="text-zinc-400 text-xs">Batas wajar: &lt; 38°C</span>
          </div>
        </CardContent>
      </Card>

      {/* MQ2 */}
      <Card className="bg-zinc-900/40 border border-zinc-800 shadow-xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase">Kadar Gas (MQ2)</p>
              <p className="text-4xl font-extrabold text-white">Normal</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:scale-110 transition-transform">
              <CloudFog className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <div className="mt-5 flex items-center text-sm">
            <span className="text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20 mr-3">Aman</span>
            <span className="text-zinc-400 text-xs">Udara ruangan bersih</span>
          </div>
        </CardContent>
      </Card>

      {/* Flame */}
      <Card className="bg-zinc-900/40 border border-zinc-800 shadow-xl relative overflow-hidden group hover:border-red-500/50 transition-colors">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase">Deteksi Api</p>
              <p className="text-4xl font-extrabold text-emerald-400">-</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 group-hover:scale-110 transition-transform">
              <Flame className="h-6 w-6 text-red-400" />
            </div>
          </div>
          <div className="mt-5 flex items-center text-sm">
            <span className="text-zinc-400 text-xs">Semua titik api negatif.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}