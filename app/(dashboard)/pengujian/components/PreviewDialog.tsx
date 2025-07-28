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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preview Dokumen</DialogTitle>
          <DialogDescription>
            Dokumen siap untuk dicetak. Klik tombol "Print" untuk melanjutkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
