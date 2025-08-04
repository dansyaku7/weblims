'use client';

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { NektonDataSet } from './data/nekton-data';

// Helper component untuk merender satu set data (Upstream/Downstream)
const NektonDataSetComponent = ({ title, dataSet, sampleInfo }: { title: string, dataSet: NektonDataSet, sampleInfo: any }) => {
  if (!dataSet) return null;

  return (
    <>
      <table className="w-full border-collapse border-2 border-black mb-4">
        <thead>
          <tr className="bg-gray-200 font-bold text-center">
            <th className="border border-black p-1">Sample No.</th>
            <th className="border border-black p-1">Sampling Location</th>
            <th className="border border-black p-1">Sample Description</th>
            <th className="border border-black p-1">Sampling Date</th>
            <th className="border border-black p-1">Sampling Time</th>
            <th className="border border-black p-1">Sampling Methods</th>
            <th className="border border-black p-1">Date Received</th>
            <th className="border border-black p-1">Interval Testing Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-1 text-center">{sampleInfo.sampleNo || '-'}</td>
            <td className="border border-black p-1 text-center">{title}</td>
            <td className="border border-black p-1 text-center">Microorganism</td>
            <td className="border border-black p-1 text-center">{sampleInfo.samplingDate || '-'}</td>
            <td className="border border-black p-1 text-center">{sampleInfo.samplingTime || '-'}</td>
            <td className="border border-black p-1 text-center">SM APHA 23rd Ed., 10600B, 2017</td>
            <td className="border border-black p-1 text-center">{sampleInfo.dateReceived || '-'}</td>
            <td className="border border-black p-1 text-center">{sampleInfo.intervalTestingDate || '-'}</td>
          </tr>
        </tbody>
      </table>
      
      <table className="w-full border-collapse border-2 border-black text-[9px] mb-4">
        <thead>
          <tr className="bg-gray-200 font-bold">
            <th className="border border-black p-1 w-8">No</th>
            <th className="border border-black p-1 text-left">INDIVIDU</th>
            <th className="border border-black p-1 w-40">Abundance (Individu/m²)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="font-bold"><td colSpan={3} className="p-1 pl-2">NEKTON</td></tr>
          {dataSet.results.map((param, index, arr) => {
            const isFirstInCategory = index === 0 || arr[index-1]?.category !== param.category;
            const categoryLetter = String.fromCharCode(65 + arr.slice(0, index).filter((p, i) => i === 0 || p.category !== arr[i-1].category).length);
            return (
              <React.Fragment key={param.id}>
                {param.category && isFirstInCategory && (
                  <tr className="font-bold">
                    <td className="border border-black p-1 text-center">{categoryLetter}</td>
                    <td colSpan={2} className="p-1 pl-2">{param.category}</td>
                  </tr>
                )}
                <tr>
                  <td className="border border-black p-1 text-center">{index + 1}</td>
                  <td className="border border-black p-1 pl-8">{param.species}</td>
                  <td className="border border-black p-1 text-center">{param.abundance || '-'}</td>
                </tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
      
      <table className="w-full border-collapse border-2 border-black text-[9px]">
        <tbody>
          <tr><td className="border border-black p-1 font-bold">TOTAL (N)</td><td className="border border-black p-1 text-center">{dataSet.summary.totalN || '-'}</td></tr>
          <tr><td className="border border-black p-1 font-bold">Taxa Total (S)</td><td className="border border-black p-1 text-center">{dataSet.summary.taxaTotalS || '-'}</td></tr>
          <tr><td className="border border-black p-1 font-bold">Diversity Index, Shannon-Wiener (H') = -∑Pi ln Pi</td><td className="border border-black p-1 text-center">{dataSet.summary.diversityH || '-'}</td></tr>
          <tr><td className="border border-black p-1 font-bold">Equitability Index (E) = H'/Ln S</td><td className="border border-black p-1 text-center">{dataSet.summary.equitabilityE || '-'}</td></tr>
          <tr><td className="border border-black p-1 font-bold">Domination Index (D) = ∑(Ni/N)²</td><td className="border border-black p-1 text-center">{dataSet.summary.dominationD || '-'}</td></tr>
        </tbody>
      </table>
    </>
  );
};

export const TemplateNektonDocument = React.forwardRef<HTMLDivElement, { data: any }>(
  ({ data }, ref) => {
    const { upstream, downstream, sampleInfo, certificateNo, showKanLogo, totalPages, pageNumber } = data;

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
            <div className="text-center my-4">
              <h1 className="text-base font-bold tracking-wider">CERTIFICATE OF ANALYSIS (COA)</h1>
              <p className="text-xs">Certificate No. {certificateNo || 'DIL-AABBCCDD-COA'}</p>
            </div>
            
            <NektonDataSetComponent title="Upstream" dataSet={upstream} sampleInfo={sampleInfo} />
            <div className="my-6"></div>
            <NektonDataSetComponent title="Downstream" dataSet={downstream} sampleInfo={sampleInfo} />
            
            <div className="mt-4 text-[8px] whitespace-pre-wrap">
              <p className='font-bold'>Notes:</p>
              <p>{sampleInfo.notes || 'Default criteria note...'}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }
);

TemplateNektonDocument.displayName = 'TemplateNektonDocument';
