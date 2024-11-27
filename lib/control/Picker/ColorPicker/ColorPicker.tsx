import React, { useState, useMemo, type FC } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch'; // 알파값 사용 여부 선택용 스위치
import type { CommonProps } from '@/types/Props';

// Utility Functions
const hsb2hex = (h: number, s: number, b: number, a?: number): string => {
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
    const rgb = [r, g, b2].map((v) =>
        Math.round((v + m) * 255)
            .toString(16)
            .padStart(2, '0'),
    );

    if (a !== undefined) {
        const alpha = Math.round(a * 255)
            .toString(16)
            .padStart(2, '0');

        return `#${[...rgb, alpha].join('').toUpperCase()}`;
    }

    return `#${rgb.join('').toUpperCase()}`;
};

const hex2hsb = (hex: string) => {
    const [r, g, b, a] = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16) / 255) ?? [
        undefined,
        undefined,
        undefined,
        undefined,
    ];

    if (r === undefined || g === undefined || b === undefined) {
        return { h: 0, s: 0, b: 0, a: 0 };
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
    return { h: Math.round(h * 60), s: Math.round(s), b: Math.round(max * 100), a: a };
};

// Component
type ColorPickerProps = {
    key: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
} & CommonProps;

export const ColorPicker: FC<ColorPickerProps> = ({ title, description, value, setValue }) => {
    const { h, s, b, a } = hex2hsb(value);

    const [hue, setHue] = useState(h);
    const [saturation, setSaturation] = useState(s);
    const [brightness, setBrightness] = useState(b);

    const [alpha, setAlpha] = useState(a);
    const [useAlpha, setUseAlpha] = useState(value.length === 9);

    const [inputValue, setInputValue] = useState(() =>
        useAlpha ? value.slice(0, 9) : value.slice(0, 7),
    );

    const updateHex = (
        newHue: number,
        newSaturation: number,
        newBrightness: number,
        newAlpha?: number,
    ) => {
        const newHex = hsb2hex(newHue, newSaturation, newBrightness, newAlpha);
        setValue(newHex);
        setInputValue(useAlpha ? newHex.slice(0, 9) : newHex.slice(0, 7)); // 알파값 제거된 HEX 업데이트
    };

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
                                        updateHex(hue, newSaturation, newBrightness, alpha);
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
                                        updateHex(newHue, saturation, brightness, alpha);
                                    }}
                                />

                                {/* Alpha Slider */}
                                {useAlpha && alpha !== undefined && (
                                    <div className="space-y-2">
                                        <label className="text-xs">Alpha</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={Math.round(alpha * 100)}
                                            onChange={(e) => {
                                                const newAlpha = Number(e.target.value) / 100;
                                                setAlpha(newAlpha);
                                                updateHex(hue, saturation, brightness, newAlpha);
                                            }}
                                            className="w-full"
                                        />
                                    </div>
                                )}

                                {/* Use Alpha Switch */}
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={useAlpha}
                                        onCheckedChange={(checked) => {
                                            setUseAlpha(checked);
                                            const updatedHex = checked
                                                ? hsb2hex(hue, saturation, brightness, alpha)
                                                : hsb2hex(hue, saturation, brightness, 1).slice(
                                                      0,
                                                      7,
                                                  );
                                            setInputValue(updatedHex);
                                            setValue(updatedHex);
                                        }}
                                    />
                                    <label className="text-xs">Use Alpha</label>
                                </div>

                                {/* HEX Input */}
                                <Input
                                    value={inputValue}
                                    onChange={(e) => {
                                        let rawValue = e.target.value.toUpperCase();
                                        if (!rawValue.startsWith('#')) {
                                            rawValue = `#${rawValue}`;
                                        }
                                        rawValue = rawValue.replace(/[^#A-Fa-f0-9]/g, '');
                                        if (rawValue.length > (useAlpha ? 9 : 7)) {
                                            rawValue = rawValue.slice(0, useAlpha ? 9 : 7);
                                        }
                                        setInputValue(rawValue);
                                        if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(rawValue)) {
                                            const { h, s, b, a } = hex2hsb(rawValue);
                                            setHue(h);
                                            setSaturation(s);
                                            setBrightness(b);
                                            setAlpha(a);
                                            setValue(rawValue);
                                        }
                                    }}
                                    maxLength={useAlpha ? 9 : 7}
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
