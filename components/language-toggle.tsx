"use client";

import { useAppTranslation, type SupportedLanguage } from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

interface LanguageToggleProps {
  currentLanguage: SupportedLanguage;
  onToggle: (lang: SupportedLanguage) => void;
}

export function LanguageToggle({
  currentLanguage,
  onToggle,
}: LanguageToggleProps) {
  return (
    <Button
      variant="outline"
      onClick={() => onToggle(currentLanguage === "en" ? "zh" : "en")}
      className="h-14 px-6 text-lg min-w-[60px] gap-3 shadow-sm"
      size="lg"
    >
      <Languages className="h-7 w-7" />
      <span className="font-semibold">
        {currentLanguage === "en" ? "中" : "EN"}
      </span>
    </Button>
  );
}
