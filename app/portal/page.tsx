// file: app/portal/page.tsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Database } from "lucide-react";

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 selection:bg-emerald-500/30">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
          System <span className="text-emerald-500">Gateway</span>
        </h1>
        <p className="text-emerald-100/60 text-lg">Pilih modul operasional yang ingin Anda akses</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full px-4">
        {/* Card Monitoring IoT */}
        <Link href="/monitoring" className="group outline-none">
          <Card className="h-full flex flex-col items-center justify-center p-10 text-center transition-all duration-300 bg-emerald-950/20 border border-emerald-900/50 hover:bg-emerald-900/40 hover:border-emerald-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] cursor-pointer">
            <div className="h-24 w-24 bg-emerald-950/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-emerald-800/50">
              <Activity className="h-12 w-12 text-emerald-400" />
            </div>
            <CardTitle className="text-2xl mb-3 text-white tracking-wide">Monitoring Lab</CardTitle>
            <CardDescription className="text-emerald-100/60 text-base leading-relaxed">
              IoT Dashboard Real-time untuk Sensor Suhu, Gas MQ2, dan Deteksi Api.
            </CardDescription>
          </Card>
        </Link>

        {/* Card LIMS */}
        <Link href="/overview" className="group outline-none">
          <Card className="h-full flex flex-col items-center justify-center p-10 text-center transition-all duration-300 bg-emerald-950/20 border border-emerald-900/50 hover:bg-emerald-900/40 hover:border-emerald-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] cursor-pointer">
            <div className="h-24 w-24 bg-emerald-950/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-emerald-800/50">
              <Database className="h-12 w-12 text-emerald-400" />
            </div>
            <CardTitle className="text-2xl mb-3 text-white tracking-wide">Open LIMS</CardTitle>
            <CardDescription className="text-emerald-100/60 text-base leading-relaxed">
              Laboratory Information Management System & Administrasi.
            </CardDescription>
          </Card>
        </Link>
      </div>
    </div>
  );
}