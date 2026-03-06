"use client";

import { useTextSizeStore, type TextSize } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function TextSizeToggle() {
  const { textSize, setTextSize, resetToDefault } = useTextSizeStore();

  const sizes: { value: TextSize; label: string }[] = [
    { value: "small", label: "S" },
    { value: "medium", label: "M" },
    { value: "large", label: "L" },
  ];

  return (
    <div className="flex gap-3">
      {sizes.map((size) => (
        <Button
          key={size.value}
          variant={textSize === size.value ? "default" : "outline"}
          onClick={() => setTextSize(size.value)}
          className="h-14 w-14 p-0 text-xl shadow-sm"
          size="icon-lg"
          aria-label={`Set text size to ${size.label}`}
          aria-pressed={textSize === size.value}
        >
          {textSize === size.value && <Check className="h-8 w-8" />}
          {textSize !== size.value && (
            <span className="font-bold">{size.label}</span>
          )}
        </Button>
      ))}
    </div>
  );
}
