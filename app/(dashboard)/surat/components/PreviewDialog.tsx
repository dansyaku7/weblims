"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PreviewDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handlePrint: () => void;
}

export default function PreviewDialog({
  open,
  setOpen,
  handlePrint,
}: PreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-background text-foreground border border-input px-6 py-4 rounded-lg shadow-md">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg font-semibold text-foreground">
            Siap untuk Mencetak?
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Klik tombol <strong>Print</strong> untuk mencetak dokumen STPS.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            className="bg-transparent text-foreground border border-input"
            onClick={() => setOpen(false)}
          >
            Batal
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            Print Surat Tugas
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
