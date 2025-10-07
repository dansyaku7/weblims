'use client';

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { vibrationReferencePermenaker5 } from './data/vibration-data';
import { DocumentFooter } from '@/app/(dashboard)/coa/components/DocumentFooter';

export const TemplateVibrationDocument = React.forwardRef<HTMLDivElement, { data: any }>(
  ({ data }, ref) => {
    const { results, sampleInfo, certificateNo, showKanLogo, totalPages, pageNumber, regulation } = data;
    
    const renderContent = () => {
        switch(regulation) {
            case 'permenaker_5':
                return (
                    <>
                        <table className="w-full border-collapse border-2 border-black mb-4">
                            <thead><tr className="bg-gray-200 font-bold text-center"><th className="border border-black p-1">Sampling Location</th><th className="border border-black p-1">Time</th><th className="border border-black p-1">Unit</th><th className="border border-black p-1">Testing Result</th><th className="border border-black p-1">Methods</th></tr></thead>
                            <tbody>{results.map((row: any, index: number) => (<tr key={index} className="text-center"><td className="border border-black p-1">{row.location}</td><td className="border border-black p-1">{row.time}</td><td className="border border-black p-1">{row.unit}</td><td className="border border-black p-1">{row.testingResult}</td><td className="border border-black p-1">{row.method}</td></tr>))}</tbody>
                        </table>
                        <table className="w-1/2 border-collapse border-2 border-black">
                            <thead><tr className="bg-gray-200 font-bold text-center"><th className="border border-black p-1">Time Amount Exposure Working Day (Hours)</th><th className="border border-black p-1">Threshold Value m/s²</th></tr></thead>
                            <tbody>{vibrationReferencePermenaker5.map(row => (<tr key={row.exposure} className="text-center"><td className="border border-black p-1">{row.exposure}</td><td className="border border-black p-1">{row.threshold}</td></tr>))}</tbody>
                        </table>
                    </>
                );
            // Add cases for other regulations here
            default:
                return <p>Template for this regulation is not available.</p>;
        }
    }

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
            <thead><tr className="bg-gray-200 font-bold text-center"><th className="border border-black p-1">Sample No.</th><th className="border border-black p-1">Sampling Location</th><th className="border border-black p-1">Sample Description</th><th className="border border-black p-1">Sampling Date</th><th className="border border-black p-1">Sampling Time</th><th className="border border-black p-1">Sampling Methods</th><th className="border border-black p-1">Date Received</th><th className="border border-black p-1">Interval Testing Date</th></tr></thead>
            <tbody>
              <tr>
                  <td className="border border-black p-1 text-center">{sampleInfo.sampleNo || '(See Table)'}</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.samplingLocation || '(See Table)'}</td>
                  <td className="border border-black p-1 text-center">Vibration</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.samplingDate || '-'}</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.samplingTime || '(See Table)'}</td>
                  <td className="border border-black p-1 text-center">Grab</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.dateReceived || '-'}</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.intervalTestingDate || '-'}</td>
              </tr>
            </tbody>
          </table>
          {renderContent()}
          <div className="mt-4 text-[8px]"><p className='font-bold'>Notes:</p><p>* : Accredited Parameters</p><p>{sampleInfo.notes || '** Default Regulatory Note'}</p></div>
        </main>

        <footer className="relative z-10">
            <DocumentFooter />
        </footer>
      </div>
    );
  }
);

TemplateVibrationDocument.displayName = 'TemplateVibrationDocument';