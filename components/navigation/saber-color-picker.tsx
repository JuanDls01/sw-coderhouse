"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { LightsaberDropdown } from "@/components/ui/lightsaber-dropdown";
import {
  SABER_COLOR_VAR,
  SABER_COLOR_OPTIONS,
  DEFAULT_SABER_COLOR,
  type SaberColor,
} from "@/utils/consts";

function getStoredColor(): SaberColor {
  if (typeof window === "undefined") return DEFAULT_SABER_COLOR;
  const saved = localStorage.getItem("saber-color");
  if (saved && saved in SABER_COLOR_VAR) {
    return saved as SaberColor;
  }
  return DEFAULT_SABER_COLOR;
}

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function SaberColorPicker() {
  const storedColor = useSyncExternalStore(
    subscribeToStorage,
    getStoredColor,
    () => DEFAULT_SABER_COLOR,
  );
  const [selectedColor, setSelectedColor] = useState<SaberColor>(storedColor);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary",
      SABER_COLOR_VAR[selectedColor],
    );
  }, [selectedColor]);

  const handleColorChange = (color: SaberColor) => {
    setSelectedColor(color);
    document.documentElement.style.setProperty(
      "--primary",
      SABER_COLOR_VAR[color],
    );
    localStorage.setItem("saber-color", color);
  };

  return (
    <LightsaberDropdown
      value={selectedColor}
      onValueChange={handleColorChange}
      options={SABER_COLOR_OPTIONS}
    />
  );
}
