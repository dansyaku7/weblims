'use client';

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { wbgtIndexWorkload } from './data/heatstress-data';
import { DocumentFooter } from '@/app/(dashboard)/coa/components/DocumentFooter';

export const TemplateHeatStressDocument = React.forwardRef<HTMLDivElement, { data: any }>(
  ({ data }, ref) => {
    const { results, sampleInfo, certificateNo, showKanLogo, totalPages, pageNumber } = data;
    
    return (
      <div ref={ref} className="p-10 font-serif text-black bg-white relative flex flex-col" style={{ width: '210mm', minHeight: '297mm' }}>
        <div className="absolute inset-25 flex items-center justify-center z-0">
          <div className="opacity-30 w-[500px] h-[500px]"><Image src="/images/logo-delta-transparan.png" alt="Logo DIL Watermark" layout="fill" objectFit="contain"/></div>
        </div>

        <header className="relative z-10 flex justify-between items-start mb-4">
          <div className="w-36"><Logo /></div>
          {showKanLogo && (
            <div className="flex flex-col items-end text-right"> 
              <div className="w-24 mb-1"><Image src="/images/kan-logo.png" alt="Logo KAN" width={100} height={45} /></div>
              <div className="text-[7px] leading-tight font-sans mt-1 space-y-px">
                <p>SK-KLHK No.00161/LPJ/Labling-1/LRK/KLHK</p>
                <p>7-a.DEC.2023-6.DEC.2028</p>
                <p>Halaman {pageNumber || 2} dari {totalPages || '...'}</p>
              </div>
            </div>
          )}
        </header>

        <main className="relative z-10 text-[9px] flex-grow">
          <div className="text-center my-4"><h1 className="text-base font-bold tracking-wider">CERTIFICATE OF ANALYSIS (COA)</h1><p className="text-xs">Certificate No. {certificateNo ? `DIL-${certificateNo}`: 'DIL-AABBCCDDCOA'}</p></div>
          <table className="w-full border-collapse border-2 border-black mb-4">
            <thead><tr className="bg-gray-200 font-bold text-center"><th className="border border-black p-1">Sampel No.</th><th className="border border-black p-1">Sampling Location</th><th className="border border-black p-1">Sample Description</th><th className="border border-black p-1">Sampling Date</th><th className="border border-black p-1">Sampling Time</th><th className="border border-black p-1">Sampling Methods</th><th className="border border-black p-1">Date Received</th><th className="border border-black p-1">Interval Testing Date</th></tr></thead>
            <tbody><tr><td className="border border-black p-1 text-center">{sampleInfo.sampleNo || '-'}</td><td className="border border-black p-1 text-center">{results.length > 1 ? '(See Table)' : (results[0]?.location || '-')}</td><td className="border border-black p-1 text-center">Heat Stress</td><td className="border border-black p-1 text-center">{sampleInfo.samplingDate || '-'}</td><td className="border border-black p-1 text-center">{results.length > 1 ? '(See Table)' : (results[0]?.time || '-')}</td><td className="border border-black p-1 text-center">Grab</td><td className="border border-black p-1 text-center">{sampleInfo.dateReceived || '-'}</td><td className="border border-black p-1 text-center">{sampleInfo.intervalTestingDate || '-'}</td></tr></tbody>
          </table>
          <table className="w-full border-collapse border-2 border-black mb-4">
            <thead><tr className="bg-gray-200 font-bold text-center"><th rowSpan={2} className="border border-black p-1 align-middle">Sampling Location</th><th rowSpan={2} className="border border-black p-1 align-middle">Time</th><th rowSpan={2} className="border border-black p-1 align-middle">Humidity (%)</th><th colSpan={3} className="border border-black p-1">Temperature(°C)</th><th rowSpan={2} className="border border-black p-1 align-middle">WBGT INDEX</th><th rowSpan={2} className="border border-black p-1 align-middle">Methods</th></tr><tr className="bg-gray-200 font-bold text-center"><th className="border border-black p-1">Wet</th><th className="border border-black p-1">Dew</th><th className="border border-black p-1">Globe</th></tr></thead>
            <tbody>{results.map((row: any, index: number) => (<tr key={index} className="text-center"><td className="border border-black p-1 text-left">{row.location}</td><td className="border border-black p-1">{row.time}</td><td className="border border-black p-1">{row.humidity}</td><td className="border border-black p-1">{row.wetTemp}</td><td className="border border-black p-1">{row.dewTemp}</td><td className="border border-black p-1">{row.globeTemp}</td><td className="border border-black p-1">{row.wbgtIndex}</td><td className="border border-black p-1">{row.method}</td></tr>))}</tbody>
          </table>
          <table className="w-full border-collapse border-2 border-black mb-4">
            <thead><tr className="bg-gray-200 font-bold text-center"><th className="border border-black p-1 align-middle">Hourly Working Time Setting</th><th colSpan={4} className="border border-black p-1">WBGT INDEX Workload</th></tr><tr className="bg-gray-200 font-bold text-center"><th className="border border-black p-1"></th><th className="border border-black p-1">Light</th><th className="border border-black p-1">Medium</th><th className="border border-black p-1">Heavy</th><th className="border border-black p-1">Very Heavy</th></tr></thead>
            <tbody>{wbgtIndexWorkload.map(row => (<tr key={row.setting} className="text-center"><td className="border border-black p-1 text-left">{row.setting}</td><td className="border border-black p-1">{row.light}</td><td className="border border-black p-1">{row.medium}</td><td className="border border-black p-1">{row.heavy}</td><td className="border border-black p-1">{row.veryHeavy}</td></tr>))}</tbody>
          </table>
          <div className="text-[8px]"><p className="font-bold">Notes:</p><p>*WBGT INDEX Quality Standards, Minister of Manpower Regulation No. 05 Year 2018</p></div>
        </main>

        <footer className="relative z-10">
          <DocumentFooter />
        </footer>
      </div>
    );
  }
);
TemplateHeatStressDocument.displayName = 'TemplateHeatStressDocument';