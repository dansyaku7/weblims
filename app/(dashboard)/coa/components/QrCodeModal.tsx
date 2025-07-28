"use client";

import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Copy } from "lucide-react";
import { toast } from "sonner";

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  reportNumber: string;
}

export function QrCodeModal({
  isOpen,
  onClose,
  url,
  reportNumber,
}: QrCodeModalProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (canvas) {
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QR_Code_${reportNumber.replace(
        /[/\\?%*:|"<>]/g,
        "-"
      )}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast.success("URL berhasil disalin!");
      },
      (err) => {
        toast.error("Gagal menyalin URL.");
        console.error("Copy failed", err);
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>QR Code Verifikasi Laporan</DialogTitle>
          <DialogDescription>
            Scan QR code ini atau unduh untuk ditempelkan di dokumen lain.
          </DialogDescription>
        </DialogHeader>
        <div
          ref={canvasRef}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-md"
        >
          {url ? (
            <QRCodeCanvas value={url} size={256} level="H" />
          ) : (
            <p className="text-black">URL tidak valid.</p>
          )}
        </div>
        <div className="mt-2 p-2 bg-slate-800 rounded-md text-xs text-slate-300 break-all">
          {url || "URL akan muncul setelah laporan disimpan."}
        </div>
        <DialogFooter className="mt-4 gap-2 sm:justify-end">
          <Button variant="outline" onClick={handleCopyUrl}>
            <Copy className="w-4 h-4 mr-2" /> Salin URL
          </Button>
          <Button variant="secondary" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" /> Unduh
          </Button>
          <Button onClick={onClose}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
