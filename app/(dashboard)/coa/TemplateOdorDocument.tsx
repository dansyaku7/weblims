// app/dashboard/coa/TemplateOdorDocument.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/logo';

// Komponen kecil untuk tabel kondisi lingkungan kerja
const WorkplaceConditionTable = ({ data }) => (
  <table className="w-1/2 border-collapse border border-black mt-2">
    <tbody>
      <tr className="bg-gray-200 font-bold"><td colSpan={3} className="border border-black p-1">Workplace Environment Condition</td></tr>
      <tr>
        <td className="border border-black p-1 w-1/3">Temperature</td>
        <td className="border border-black p-1 w-px">:</td>
        <td className="border border-black p-1">{data.temperatureWorkplace || '-'} °C</td>
      </tr>
      <tr>
        <td className="border border-black p-1">Humidity</td>
        <td className="border border-black p-1">:</td>
        <td className="border border-black p-1">{data.humidityWorkplace || '-'} %RH</td>
      </tr>
    </tbody>
  </table>
);

// Komponen kecil untuk tabel kondisi lingkungan ambien
const AmbientConditionTable = ({ data }) => (
  <table className="w-1/2 border-collapse border border-black mt-2">
    <tbody>
      <tr className="bg-gray-200 font-bold"><td colSpan={3} className="border border-black p-1">Ambient Environmental Condition</td></tr>
      <tr><td className="border border-black p-1 w-1/3">Coordinate</td><td className="border border-black p-1 w-px">:</td><td className="border border-black p-1">{data.coordinate || '-'}</td></tr>
      <tr><td className="border border-black p-1">Temperature</td><td className="border border-black p-1">:</td><td className="border border-black p-1">{data.temperatureAmbient || '-'} °C</td></tr>
      <tr><td className="border border-black p-1">Pressure</td><td className="border border-black p-1">:</td><td className="border border-black p-1">{data.pressure || '-'} mmHg</td></tr>
      <tr><td className="border border-black p-1">Humidity</td><td className="border border-black p-1">:</td><td className="border border-black p-1">{data.humidityAmbient || '-'} %RH</td></tr>
      <tr><td className="border border-black p-1">Wind Speed</td><td className="border border-black p-1">:</td><td className="border border-black p-1">{data.windSpeed || '-'} m/s</td></tr>
      <tr><td className="border border-black p-1">Wind Direction</td><td className="border border-black p-1">:</td><td className="border border-black p-1">{data.windDirection || '-'}</td></tr>
      <tr><td className="border border-black p-1">Weather</td><td className="border border-black p-1">:</td><td className="border border-black p-1">{data.weather || '-'}</td></tr>
    </tbody>
  </table>
);


export const TemplateOdorDocument = React.forwardRef<HTMLDivElement, { data: any }>(
  ({ data }, ref) => {
    const { results, sampleInfo, certificateNo, showKanLogo, totalPages, pageNumber, regulation } = data;
    
    const regulatoryNote = regulation === 'kepmenlh' 
      ? '** Minister of Environmental Decree of Republic of Indonesia Regarding Odor Level Standard (KEP-50/MENLH/11/1996)'
      : '** Minister of Manpower Regulation No. 05 Year 2018';

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
              <p className="text-xs">Certificate No. {certificateNo ? `${certificateNo}`: 'DIL-AABBCCDDCOA'}</p>
            </div>

            <table className="w-full border-collapse border-2 border-black mb-4">
              <thead>
                <tr className="bg-gray-200 font-bold text-center">
                  <th className="border border-black p-1">Sample No.</th><th className="border border-black p-1">Sampling Location</th><th className="border border-black p-1">Sample Description</th><th className="border border-black p-1">Sampling Date</th><th className="border border-black p-1">Sampling Time</th><th className="border border-black p-1">Sampling Method</th><th className="border border-black p-1">Date Received</th><th className="border border-black p-1">Interval Testing Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1 text-center">{sampleInfo.sampleNo || '-'}</td><td className="border border-black p-1 text-center">{sampleInfo.samplingLocation || '-'}</td><td className="border border-black p-1 text-center">Odor</td><td className="border border-black p-1 text-center">{sampleInfo.samplingDate || '-'}</td><td className="border border-black p-1 text-center">{sampleInfo.samplingTime || '-'}</td><td className="border border-black p-1 text-center">Grab</td><td className="border border-black p-1 text-center">{sampleInfo.dateReceived || '-'}</td><td className="border border-black p-1 text-center">{sampleInfo.intervalTestingDate || '-'}</td>
                </tr>
              </tbody>
            </table>
            
            <table className="w-full border-collapse border-2 border-black mb-4">
              <thead>
                <tr className="bg-gray-200 font-bold text-center">
                  <th className="border border-black p-1">No</th><th className="border border-black p-1">Parameters</th><th className="border border-black p-1">Testing Result</th><th className="border border-black p-1">Regulatory Standard**</th><th className="border border-black p-1">Unit</th><th className="border border-black p-1">Methods</th>
                </tr>
              </thead>
              <tbody>
                {results.map((param, index) => (
                  <tr key={param.id} className="text-center">
                    <td className="border border-black p-1">{index + 1}</td><td className="border border-black p-1 text-left">{param.name}</td><td className="border border-black p-1">{param.testingResult || '-'}</td><td className="border border-black p-1">{param.standard}</td><td className="border border-black p-1">{param.unit}</td><td className="border border-black p-1">{param.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {regulation.startsWith('permenaker') 
              ? <WorkplaceConditionTable data={sampleInfo} /> 
              : <AmbientConditionTable data={sampleInfo} />
            }

            <div className="text-[8px] mt-4">
              <p className="font-bold">Notes:</p>
              <p>* : Accredited Parameters</p>
              <p>{regulatoryNote}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }
);
TemplateOdorDocument.displayName = 'TemplateOdorDocument';