"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface BapsPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  onPrint: () => void;
}

export function BapsPreviewDialog({
  open,
  onClose,
  onPrint,
}: BapsPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-background text-foreground border border-border p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-foreground">
            Siap Mencetak Berita Acara?
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Pastikan semua data sudah benar. Klik <strong>'Print'</strong> untuk
            melanjutkan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent border border-input text-foreground"
          >
            Batal
          </Button>
          <Button onClick={onPrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
