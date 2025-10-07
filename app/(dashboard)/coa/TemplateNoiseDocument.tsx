// components/TemplateNoiseDocument.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { DocumentFooter } from '@/app/(dashboard)/coa/components/DocumentFooter';

export const TemplateNoiseDocument = React.forwardRef<HTMLDivElement, { data: any }>(
  ({ data }, ref) => {
    const { results, sampleInfo, certificateNo, showKanLogo, totalPages, pageNumber, regulation } = data;
    
    const visibleResults = results ? results.filter((param: any) => param.isVisible !== false) : [];

    const renderSimpleTable = () => (
        <table className="w-full border-collapse border-2 border-black text-[9px]">
            <thead>
                <tr className="bg-gray-200 font-bold text-center">
                    <th className="border border-black p-1">No</th>
                    <th className="border border-black p-1 text-left">Sampling Location</th>
                    <th className="border border-black p-1">Time</th>
                    <th className="border border-black p-1">Testing Result</th>
                    <th className="border border-black p-1">Regulatory Standard**</th>
                    <th className="border border-black p-1">Unit</th>
                    <th className="border border-black p-1 text-left">Methods</th>
                </tr>
            </thead>
            <tbody>
                {visibleResults.map((row, index) => (
                    <tr key={row.id} className="text-center">
                        <td className="border border-black p-1">{index + 1}</td>
                        <td className="border border-black p-1 text-left">{row.location}</td>
                        <td className="border border-black p-1">{row.time}</td>
                        <td className="border border-black p-1">{row.testingResult}</td>
                        <td className="border border-black p-1">{row.standard}</td>
                        <td className="border border-black p-1">{row.unit}</td>
                        <td className="border border-black p-1 text-left">{row.method}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderComplexTable = () => (
       <table className="w-full border-collapse border-2 border-black text-[9px]">
            <thead>
                <tr className="bg-gray-200 font-bold text-center">
                    <th className="border border-black p-1">No</th>
                    <th className="border border-black p-1 text-left">Sampling Location</th>
                    <th className="border border-black p-1">Noise</th>
                    <th className="border border-black p-1">Time</th>
                    <th className="border border-black p-1">Leq</th>
                    <th className="border border-black p-1">Ls</th>
                    <th className="border border-black p-1">Lm</th>
                    <th className="border border-black p-1">Lsm</th>
                    <th className="border border-black p-1">Regulatory Standard**</th>
                    <th className="border border-black p-1">Unit</th>
                    <th className="border border-black p-1 text-left">Methods</th>
                </tr>
            </thead>
            <tbody>
                {visibleResults.map((location, locationIndex) => (
                    <React.Fragment key={location.id}>
                        {location.measurements.map((m, measurementIndex) => (
                            <tr key={m.id} className="text-center">
                                {measurementIndex === 0 && <td rowSpan={location.measurements.length} className="border border-black p-1">{locationIndex + 1}</td>}
                                {measurementIndex === 0 && <td rowSpan={location.measurements.length} className="border border-black p-1 text-left">{location.locationName}</td>}
                                <td className="border border-black p-1">{m.point.split('/')[0].trim()}</td>
                                <td className="border border-black p-1">{m.point.split('/')[1].trim()}</td>
                                <td className="border border-black p-1">{m.leq}</td>
                                <td className="border border-black p-1">{m.ls}</td>
                                <td className="border border-black p-1">{m.lm}</td>
                                <td className="border border-black p-1">{m.lsm}</td>
                                {measurementIndex === 0 && <td rowSpan={location.measurements.length} className="border border-black p-1">{location.standard}</td>}
                                {measurementIndex === 0 && <td rowSpan={location.measurements.length} className="border border-black p-1">{location.unit}</td>}
                                {measurementIndex === 0 && <td rowSpan={location.measurements.length} className="border border-black p-1 text-left">{location.method}</td>}
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );


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
          <div className="text-center my-4"><h1 className="text-base font-bold tracking-wider">CERTIFICATE OF ANALYSIS (COA)</h1><p className="text-xs">Certificate No. {certificateNo ? `${certificateNo}`: 'DIL-AABBCCDDCOA'}</p></div>
          
          <table className="w-full border-collapse border-2 border-black mb-4">
            <thead><tr className="bg-gray-200 font-bold text-center"><th className="border border-black p-1">Sample No.</th><th className="border border-black p-1">Sampling Location</th><th className="border border-black p-1">Sample Description</th><th className="border border-black p-1">Sampling Date</th><th className="border border-black p-1">Sampling Time</th><th className="border border-black p-1">Sampling Method</th><th className="border border-black p-1">Date Received</th><th className="border border-black p-1">Interval Testing Date</th></tr></thead>
            <tbody>
              <tr>
                  <td className="border border-black p-1 text-center">{sampleInfo.sampleNo || '-'}</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.samplingLocation || '-'}</td>
                  <td className="border border-black p-1 text-center">Noise*</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.samplingDate || '-'}</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.samplingTime || '-'}</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.samplingMethod || '-'}</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.dateReceived || '-'}</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.intervalTestingDate || '-'}</td>
              </tr>
            </tbody>
          </table>
          
          {['kepmen_lh_48', 'kepgub_dki_551'].includes(regulation) ? renderComplexTable() : renderSimpleTable()}

          <div className="mt-4 text-[8px]"><p className='font-bold'>Notes:</p><p>* : Accredited Parameters</p><p>{sampleInfo.notes || '** Default Regulatory Note'}</p></div>
        </main>

        <footer className="relative z-10">
          <DocumentFooter />
        </footer>
      </div>
    );
  }
);

TemplateNoiseDocument.displayName = 'TemplateNoiseDocument';