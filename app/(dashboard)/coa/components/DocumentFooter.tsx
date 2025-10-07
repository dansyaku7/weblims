import React from "react";

export const DocumentFooter = () => {
  return (
    // Saya ubah pt-8 (padding-top: 2rem) menjadi pt-4 (padding-top: 1rem)
    <footer className="mt-auto pt-4"> 
      <div className="flex justify-between items-end">
        <div className="text-[8px] space-y-px w-1/2">
          <p className="font-bold">Ruko Prima Orchard No.C3</p>
          <p>Jl. Raya Perjuangan, Harapan Baru,</p>
          <p>Kec. Bekasi Utara, Kota Bekasi, Jawa Barat</p>
          <p>Telp : 021-8923 7914</p>
          <p className="text-blue-600">www.deltaindonesialab.com</p>
        </div>
        <div className="w-5/12 ml-auto"></div>
      </div>
      <div className="text-center text-[7px] italic mt-4 pt-2 border-t border-gray-400">
        "This result (s) relate only to the sample (s) tested and the test
        report/certificate shall not be reproduced except in full, without
        written approval of PT Delta Indonesia Laboratory"
      </div>
    </footer>
  );
};