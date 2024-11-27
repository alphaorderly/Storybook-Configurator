import React, { useState, useMemo, type FC } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { CommonProps } from '@/types/Props';

// Utility Functions
const hsb2hex = (h: number, s: number, b: number): string => {
    const c = (b / 100) * (s / 100);
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = b / 100 - c;
    const [r, g, b2] =
        h < 60
            ? [c, x, 0]
            : h < 120
              ? [x, c, 0]
              : h < 180
                ? [0, c, x]
                : h < 240
                  ? [0, x, c]
                  : h < 300
                    ? [x, 0, c]
                    : [c, 0, x];
    return `#${[r, g, b2]
        .map((v) =>
            Math.round((v + m) * 255)
                .toString(16)
                .padStart(2, '0'),
        )
        .join('')
        .toUpperCase()}`;
};

const hex2hsb = (hex: string) => {
    const [r, g, b] = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16) / 255) || [0, 0, 0];
    if (r === undefined || g === undefined || b === undefined) {
        return { h: 0, s: 0, b: 0 };
    }
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const h = delta
        ? max === r
            ? ((g - b) / delta) % 6
            : max === g
              ? (b - r) / delta + 2
              : (r - g) / delta + 4
        : 0;
    const s = max ? (delta / max) * 100 : 0;
    return { h: Math.round(h * 60), s: Math.round(s), b: Math.round(max * 100) };
};

// Component
type ColorPickerProps = {
    value: string;
    setValue: (value: string) => void;
} & CommonProps;

export const ColorPicker: FC<ColorPickerProps> = ({ title, description, value, setValue }) => {
    const [hue, setHue] = useState(() => hex2hsb(value).h); // Controls hue (slider)
    const [saturation, setSaturation] = useState(() => hex2hsb(value).s); // Controls saturation
    const [brightness, setBrightness] = useState(() => hex2hsb(value).b); // Controls brightness

    // Update HEX value based on HSB changes
    const updateHex = (newHue: number, newSaturation: number, newBrightness: number) => {
        setValue(hsb2hex(newHue, newSaturation, newBrightness));
    };

    // Update Gradient (Saturation/Brightness stays constant, only background depends on hue)
    const gradientBackground = useMemo(() => hsb2hex(hue, 100, 100), [hue]);

    return (
        <Card className="w-full p-4">
            <CardHeader className="p-0">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <CardTitle className="text-sm font-medium">{title}</CardTitle>
                        <CardDescription className="text-xs">{description}</CardDescription>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-10 h-10"
                                style={{ backgroundColor: value }}
                            />
                        </PopoverTrigger>
                        <PopoverContent className="p-4 w-64">
                            <div className="space-y-4">
                                {/* Saturation/Brightness Selector */}
                                <div
                                    className="w-full h-32 rounded-md cursor-crosshair relative"
                                    style={{
                                        backgroundImage: `
                                            linear-gradient(to bottom, transparent, #000),
                                            linear-gradient(to right, #fff, transparent)
                                        `,
                                        backgroundColor: gradientBackground,
                                    }}
                                    onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = Math.min(
                                            Math.max(0, e.clientX - rect.left),
                                            rect.width,
                                        );
                                        const y = Math.min(
                                            Math.max(0, e.clientY - rect.top),
                                            rect.height,
                                        );
                                        const newSaturation = Math.round((x / rect.width) * 100);
                                        const newBrightness = Math.round(
                                            100 - (y / rect.height) * 100,
                                        );
                                        setSaturation(newSaturation);
                                        setBrightness(newBrightness);
                                        updateHex(hue, newSaturation, newBrightness);
                                    }}
                                />

                                {/* Hue Slider */}
                                <div
                                    className="w-full h-3 rounded-md cursor-pointer"
                                    style={{
                                        background:
                                            'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
                                    }}
                                    onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = Math.min(
                                            Math.max(0, e.clientX - rect.left),
                                            rect.width,
                                        );
                                        const newHue = Math.round((x / rect.width) * 360);
                                        setHue(newHue);
                                        updateHex(newHue, saturation, brightness);
                                    }}
                                />

                                {/* HEX Input */}
                                <Input
                                    value={value}
                                    onChange={(e) => {
                                        const hex = e.target.value.toUpperCase();
                                        if (/^#([A-F0-9]{6})$/.test(hex)) {
                                            const { h, s, b } = hex2hsb(hex);
                                            setHue(h);
                                            setSaturation(s);
                                            setBrightness(b);
                                            setValue(hex);
                                        }
                                    }}
                                    maxLength={7}
                                    className="font-mono"
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </CardHeader>
        </Card>
    );
};

ColorPicker.displayName = 'ColorPicker';
