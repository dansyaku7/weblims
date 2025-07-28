"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, FilePlus2 } from "lucide-react";

interface Template {
  id: string;
  name: string;
}

interface TemplateSelectionProps {
  templates: Template[];
  onSelectTemplate: (id: string) => void;
  onBack: () => void;
}

export function TemplateSelection({
  templates,
  onSelectTemplate,
  onBack,
}: TemplateSelectionProps) {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle>Langkah 2: Pilih Template</CardTitle>
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template: Template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border bg-card p-6 text-center transition-all hover:border-primary hover:bg-muted/50"
          >
            <FilePlus2 className="mb-3 h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
            <p className="font-semibold text-foreground">{template.name}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
