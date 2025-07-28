// components/TemplateNonSSEDocument.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/logo';

export const TemplateNonSSEDocument = React.forwardRef<HTMLDivElement, { data: any }>(
  ({ data }, ref) => {
    const { results, sampleInfo, certificateNo, showKanLogo, totalPages, pageNumber } = data;
    
    const visibleResults = results ? results.filter((param: any) => param.isVisible) : [];

    return (
      <div ref={ref} className="p-10 font-serif text-black bg-white relative" style={{ width: '210mm', minHeight: '297mm' }}>
        <div className="absolute inset-25 flex items-center justify-center z-0">
          <div className="opacity-30 w-[500px] h-[500px]"><Image src="/images/logo-delta-transparan.png" alt="Logo DIL Watermark" layout="fill" objectFit="contain"/></div>
        </div>
        <div className="relative z-10">
          <header className="flex justify-between items-start mb-4">
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
          <main className="text-[9px]">
            <div className="text-center my-4"><h1 className="text-base font-bold tracking-wider">CERTIFICATE OF ANALYSIS (COA)</h1><p className="text-xs">Certificate No. {certificateNo ? `${certificateNo}`: 'DIL-AABBCCDDCOA'}</p></div>
            
            <table className="w-full border-collapse border-2 border-black mb-4">
              <thead><tr className="bg-gray-200 font-bold text-center"><th className="border border-black p-1">Sample No.</th><th className="border border-black p-1">Sampling Location</th><th className="border border-black p-1">Sample Description</th><th className="border border-black p-1">Sampling Date</th><th className="border border-black p-1">Sampling Time</th><th className="border border-black p-1">Date Received</th><th className="border border-black p-1">Interval Testing Date</th></tr></thead>
              <tbody>
                <tr>
                    <td className="border border-black p-1 text-center">{sampleInfo.sampleNo || '-'}</td>
                    <td className="border border-black p-1 text-center">{sampleInfo.samplingLocation || 'See Table'}</td>
                    <td className="border border-black p-1 text-center">Non-Stationary Source Emission</td>
                    <td className="border border-black p-1 text-center">{sampleInfo.samplingDate || '-'}</td>
                    <td className="border border-black p-1 text-center">{sampleInfo.samplingTime || '-'}</td>
                    <td className="border border-black p-1 text-center">{sampleInfo.dateReceived || '-'}</td>
                    <td className="border border-black p-1 text-center">{sampleInfo.intervalTestingDate || '-'}</td>
                </tr>
              </tbody>
            </table>
            
            <table className="w-full border-collapse border-2 border-black text-[9px]">
              <thead>
                <tr className="bg-gray-200 font-bold text-center">
                    <th className="border border-black p-1">No</th>
                    <th className="border border-black p-1">Location</th>
                    <th className="border border-black p-1">Fuel</th>
                    <th className="border border-black p-1">Year</th>
                    <th className="border border-black p-1">Vehicle Brand</th>
                    <th className="border border-black p-1">Capacity</th>
                    <th className="border border-black p-1">Parameters</th>
                    <th className="border border-black p-1">Testing Result</th>
                    <th className="border border-black p-1">Regulatory Standard**</th>
                    <th className="border border-black p-1">Unit</th>
                    <th className="border border-black p-1">Methods</th>
                </tr>
              </thead>
              <tbody>
                {visibleResults.map((row: any, index: number) => (
                    <tr key={row.id} className="text-center">
                        <td className="border border-black p-1">{index + 1}</td>
                        <td className="border border-black p-1">{row.location}</td>
                        <td className="border border-black p-1">{row.fuel}</td>
                        <td className="border border-black p-1">{row.year}</td>
                        <td className="border border-black p-1">{row.vehicleBrand}</td>
                        <td className="border border-black p-1">{row.capacity}</td>
                        <td className="border border-black p-1">{row.parameter}</td>
                        <td className="border border-black p-1">{row.testingResult}</td>
                        <td className="border border-black p-1">{row.standard}</td>
                        <td className="border border-black p-1">{row.unit}</td>
                        <td className="border border-black p-1 text-left">{row.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-[8px]"><p className='font-bold'>Notes:</p><p>{sampleInfo.notes || '** Default Regulatory Note'}</p></div>
          </main>
        </div>
      </div>
    );
  }
);

TemplateNonSSEDocument.displayName = 'TemplateNonSSEDocument';
