// Made by SyK
"use client";

import { Cloud, Wind } from "lucide-react";

interface CardProps {
  label: string;
  value: string | number;
  unit?: string;
  accentClass: string;
  iconBgClass: string;
  iconColorClass: string;
  icon: React.ReactNode;
  secLabel: string;
  secValue: string | number;
  secUnit: string;
  secColor: string;
  barClass: string;
  barWidth: string;
  barTicks: [string, string, string];
  valueColor?: string;
}

function SensorCard({
  label, value, unit, accentClass, iconBgClass, iconColorClass, icon,
  secLabel, secValue, secUnit, secColor,
  barClass, barWidth, barTicks, valueColor,
}: CardProps) {
  return (
    <div className={`relative overflow-hidden rounded-[14px] border border-zinc-800/70 bg-[#0f1217] p-[22px] pb-[18px] transition-all duration-300 hover:border-white/10 group`}>
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${accentClass}`} />

      {/* Primary value */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-600 mb-2">{label}</p>
          <p className={`font-mono text-[44px] font-bold leading-none ${valueColor ?? "text-[#f0f6fc]"}`}>
            {value}{unit && <span className="text-[18px] text-zinc-600 font-normal">{unit}</span>}
          </p>
        </div>
        <div className={`flex items-center justify-center w-[38px] h-[38px] rounded-[9px] border ${iconBgClass} ${iconColorClass} group-hover:scale-110 transition-transform flex-shrink-0`}>
          {icon}
        </div>
      </div>

      <div className="h-px bg-zinc-800 my-[14px]" />

      {/* Secondary stat */}
      <div className="mb-[14px]">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-600 mb-1">{secLabel}</p>
        <p className={`font-mono text-[24px] font-bold leading-none ${secColor}`}>
          {secValue}<span className="text-[13px] text-zinc-600 font-normal"> {secUnit}</span>
        </p>
      </div>

      {/* Bar */}
      <div>
        <div className="h-[3px] rounded-full bg-zinc-800 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${barClass}`} style={{ width: barWidth }} />
        </div>
        <div className="flex justify-between mt-[5px]">
          {barTicks.map((t, i) => <span key={i} className="font-mono text-[9px] text-zinc-700" key={i}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function StatCards({ data }: { data: any }) {
  // Hanya mengekstrak data CO2 dan O2
  const co2Raw = data?.co2 ? parseFloat(data.co2) : 0;
  const o2Raw = data?.o2 ? parseFloat(data.o2) : 209500;

  // Persentase Bar Indikator
  const co2Pct = `${Math.min(100, (co2Raw / 5000) * 100).toFixed(1)}%`;
  const o2Pct = `${Math.min(100, (o2Raw / 209500) * 100).toFixed(1)}%`;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SensorCard
        label="Kadar CO2"
        value={co2Raw.toFixed(0)} unit=" ppm"
        accentClass="bg-gradient-to-r from-purple-500 to-purple-700"
        iconBgClass="bg-purple-500/10 border-purple-500/20"
        iconColorClass="text-purple-400"
        icon={<Cloud className="h-[18px] w-[18px]" />}
        secLabel="Kualitas Udara"
        secValue={co2Raw.toFixed(0)} secUnit="ppm" secColor="text-purple-400"
        barClass="bg-purple-500" barWidth={co2Pct}
        barTicks={["0", `${co2Raw.toFixed(0)}`, "5000"]}
      />

      <SensorCard
        label="Estimasi O2"
        value={o2Raw.toFixed(0)} unit=" ppm"
        accentClass="bg-gradient-to-r from-cyan-500 to-cyan-700"
        iconBgClass="bg-cyan-500/10 border-cyan-500/20"
        iconColorClass="text-cyan-400"
        icon={<Wind className="h-[18px] w-[18px]" />}
        secLabel="Status Oksigen"
        secValue={o2Raw.toFixed(0)} secUnit="ppm" secColor="text-cyan-400"
        barClass="bg-cyan-500" barWidth={o2Pct}
        barTicks={["0", `${o2Raw.toFixed(0)}`, "209500"]}
      />
    </div>
  );
}