"use client";

import { Thermometer, Flame, CloudFog } from "lucide-react";

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
  thresholds: { key: string; keyColor: string; num: string; numColor: string; desc: string }[];
  barClass: string;
  barWidth: string;
  barTicks: [string, string, string];
  valueColor?: string;
}

function SensorCard({
  label, value, unit, accentClass, iconBgClass, iconColorClass, icon,
  secLabel, secValue, secUnit, secColor,
  thresholds, barClass, barWidth, barTicks, valueColor,
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

      {/* Secondary big stat */}
      <div className="mb-[14px]">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-600 mb-1">{secLabel}</p>
        <p className={`font-mono text-[28px] font-bold leading-none ${secColor}`}>
          {secValue}<span className="text-[13px] text-zinc-600 font-normal"> {secUnit}</span>
        </p>
      </div>

      {/* Threshold blocks */}
      <div className="flex gap-2 mb-[14px]">
        {thresholds.map((t, i) => (
          <div key={i} className="flex-1 rounded-lg border border-zinc-800 bg-[#0a0c0f] px-[10px] py-2 flex flex-col gap-[3px]">
            <span className={`font-mono text-[9px] font-semibold uppercase tracking-[0.12em] ${t.keyColor}`}>{t.key}</span>
            <span className={`font-mono text-[20px] font-bold leading-none ${t.numColor}`}>{t.num}</span>
            <span className="font-mono text-[9px] text-zinc-600">{t.desc}</span>
          </div>
        ))}
      </div>

      {/* Bar */}
      <div>
        <div className="h-[3px] rounded-full bg-zinc-800 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${barClass}`} style={{ width: barWidth }} />
        </div>
        <div className="flex justify-between mt-[5px]">
          {barTicks.map((t, i) => <span key={i} className="font-mono text-[9px] text-zinc-700">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function StatCards({ data }: { data: any }) {
  const suhuRaw = data?.suhu_mentah ? parseFloat(data.suhu_mentah) : 0;
  const suhu = suhuRaw.toFixed(1);
  const ror = data?.ror_suhu ? parseFloat(data.ror_suhu).toFixed(4) : "0.0000";
  const rorSign = data?.ror_suhu && parseFloat(data.ror_suhu) >= 0 ? "+" : "";
  const gas = data?.gas_mentah || 0;
  const maGas = data?.ma_gas || 0;
  const api = data?.api_mentah ?? 4095;
  const isApiSafe = api > 1500;

  const suhuPct = `${Math.min(100, (suhuRaw / 60) * 100).toFixed(1)}%`;
  const gasPct = `${Math.min(100, (gas / 4095) * 100).toFixed(1)}%`;
  const apiPct = `${Math.min(100, (api / 4095) * 100).toFixed(1)}%`;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SensorCard
        label="Suhu Ruangan"
        value={suhu} unit="°C"
        accentClass="bg-gradient-to-r from-orange-500 to-orange-700"
        iconBgClass="bg-orange-500/10 border-orange-500/20"
        iconColorClass="text-orange-400"
        icon={<Thermometer className="h-[18px] w-[18px]" />}
        secLabel="Rate of Rise"
        secValue={`${rorSign}${ror}`} secUnit="°C/s" secColor="text-orange-400"
        thresholds={[
          { key: "Normal",  keyColor: "text-orange-400", num: "≤ 35", numColor: "text-[#f0f6fc]", desc: "°C batas aman" },
          { key: "Kritis",  keyColor: "text-red-400",    num: "> 50", numColor: "text-red-400",    desc: "°C bahaya" },
        ]}
        barClass="bg-orange-500" barWidth={suhuPct}
        barTicks={["0°C", `${suhu}°C`, "60°C"]}
      />

      <SensorCard
        label="Kadar Gas (MQ-2)"
        value={gas}
        accentClass="bg-gradient-to-r from-blue-500 to-blue-700"
        iconBgClass="bg-blue-500/10 border-blue-500/20"
        iconColorClass="text-blue-400"
        icon={<CloudFog className="h-[18px] w-[18px]" />}
        secLabel="Moving Average (Baseline)"
        secValue={maGas} secUnit="poin" secColor="text-blue-400"
        thresholds={[
          { key: "Waspada", keyColor: "text-blue-400",  num: "> 500",  numColor: "text-[#f0f6fc]", desc: "poin delta" },
          { key: "Bahaya",  keyColor: "text-red-400",   num: "> 1500", numColor: "text-red-400",   desc: "poin MQ-2" },
        ]}
        barClass="bg-blue-500" barWidth={gasPct}
        barTicks={["0", `${gas}`, "4095"]}
      />

      <SensorCard
        label="Deteksi Api (Flame)"
        value={api}
        valueColor={isApiSafe ? "text-emerald-400" : "text-red-400 animate-pulse"}
        accentClass="bg-gradient-to-r from-red-500 to-red-700"
        iconBgClass="bg-red-500/10 border-red-500/20"
        iconColorClass="text-red-400"
        icon={<Flame className="h-[18px] w-[18px]" />}
        secLabel="Status Sensor"
        secValue={isApiSafe ? "AMAN" : "BAHAYA"}
        secUnit={`· ${api}/4095`}
        secColor={isApiSafe ? "text-emerald-400" : "text-red-400"}
        thresholds={[
          { key: "Aman",   keyColor: "text-emerald-400", num: "4095",   numColor: "text-emerald-400", desc: "tidak ada api" },
          { key: "Bahaya", keyColor: "text-red-400",      num: "< 1500", numColor: "text-red-400",     desc: "api terdeteksi" },
        ]}
        barClass={isApiSafe ? "bg-emerald-500" : "bg-red-500"} barWidth={apiPct}
        barTicks={["0", isApiSafe ? `${api} ✓` : `${api} ⚠`, "4095"]}
      />
    </div>
  );
}