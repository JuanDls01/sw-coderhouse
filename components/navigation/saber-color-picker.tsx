'use client';

import { useState } from 'react';
import { LightsaberDropdown } from '@/components/ui/lightsaber-dropdown';
import { SABER_COLOR_VAR, SABER_COLOR_OPTIONS, DEFAULT_SABER_COLOR, type SaberColor } from '@/utils/consts';
import { setCookie } from '@/utils/cookies';

interface SaberColorPickerProps {
  initialColor?: SaberColor;
}

export function SaberColorPicker({ initialColor = DEFAULT_SABER_COLOR }: SaberColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<SaberColor>(initialColor);

  const handleColorChange = (color: SaberColor) => {
    setSelectedColor(color);
    document.documentElement.style.setProperty('--primary', SABER_COLOR_VAR[color]);
    setCookie('saber-color', color);
  };

  return (
    <LightsaberDropdown
      value={selectedColor}
      onValueChange={handleColorChange}
      options={SABER_COLOR_OPTIONS}
    />
  );
}
