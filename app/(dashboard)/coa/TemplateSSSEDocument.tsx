// components/TemplateSSSEDocument.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/logo';

export const TemplateSSSEDocument = React.forwardRef<HTMLDivElement, { data: any }>(
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
              <thead><tr className="bg-gray-200 font-bold text-center"><th className="border border-black p-1">Sample No.</th><th className="border border-black p-1">Sampling Location</th><th className="border border-black p-1">Sample Description</th><th className="border border-black p-1">Sampling Date</th><th className="border border-black p-1">Sampling Time</th><th className="border border-black p-1">Sampling Methods</th><th className="border border-black p-1">Date Received</th><th className="border border-black p-1">Interval Testing Date</th></tr></thead>
              <tbody>
                <tr>
                    <td className="border border-black p-1 text-center">{sampleInfo.sampleNo || '-'}</td>
                    <td className="border border-black p-1 text-center">{sampleInfo.samplingLocation || '-'}</td>
                    <td className="border border-black p-1 text-center">Stationary Stack Source Emission</td>
                    <td className="border border-black p-1 text-center">{sampleInfo.samplingDate || '-'}</td>
                    <td className="border border-black p-1 text-center">{sampleInfo.samplingTime || '-'}</td>
                    <td className="border border-black p-1 text-center">{sampleInfo.samplingMethod || '-'}</td>
                    <td className="border border-black p-1 text-center">{sampleInfo.dateReceived || '-'}</td>
                    <td className="border border-black p-1 text-center">{sampleInfo.intervalTestingDate || '-'}</td>
                </tr>
              </tbody>
            </table>
            
            <table className="w-full border-collapse border-2 border-black text-[9px]">
              <thead>
                <tr className="bg-gray-200 font-bold">
                    <th className="border border-black p-1 w-8 font-bold">No</th>
                    <th className="border border-black p-1 font-bold text-left">Parameters</th>
                    <th className="border border-black p-1 w-24 font-bold">Testing Result</th>
                    <th className="border border-black p-1 w-28 font-bold">Regulatory Standard**</th>
                    <th className="border border-black p-1 w-20 font-bold">Unit</th>
                    <th className="border border-black p-1 font-bold text-left">Methods</th>
                </tr>
              </thead>
              <tbody>
                {visibleResults.map((param: any, index: number) => (
                    <tr key={`${param.name}-${index}`}>
                        <td className="border border-black p-1 text-center">{index + 1}</td>
                        <td className="border border-black p-1 text-left">{param.name}</td>
                        <td className="border border-black p-1 text-center">{param.testingResult || '-'}</td>
                        <td className="border border-black p-1 text-center">{param.standard}</td>
                        <td className="border border-black p-1 text-center">{param.unit}</td>
                        <td className="border border-black p-1 text-left">{param.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <table className="w-1/2 border-collapse border border-black mt-2">
                <tbody>
                <tr className="bg-gray-200 font-bold"><td colSpan={3} className="border border-black p-1">Stack Data</td></tr>
                <tr><td className="border border-black p-1 w-1/3">Coordinate</td><td className="border border-black p-1 w-px">:</td><td className="border border-black p-1">{sampleInfo.coordinate || '-'}</td></tr>
                <tr><td className="border border-black p-1">Velocity</td><td className="border border-black p-1">:</td><td className="border border-black p-1">{sampleInfo.velocity || '-'} m/s</td></tr>
                {sampleInfo.stackTemperature && <tr><td className="border border-black p-1">Stack Temperature</td><td className="border border-black p-1">:</td><td className="border border-black p-1">{sampleInfo.stackTemperature} °C</td></tr>}
                </tbody>
            </table>

            <div className="mt-4 text-[8px]"><p className='font-bold'>Notes:</p><p>{'<'} : Less Than MDL (Method Detection Limit)</p><p>* : Accredited Parameters</p><p>{sampleInfo.notes || '** Default Regulatory Note'}</p></div>
          </main>
        </div>
      </div>
    );
  }
);

TemplateSSSEDocument.displayName = 'TemplateSSSEDocument';
