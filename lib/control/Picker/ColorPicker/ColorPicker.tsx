import React, { forwardRef, useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paintbrush } from 'lucide-react';

type CommonControlProps = {
    title: string;
    description: string;
};

type ColorPickerProps = CommonControlProps & {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
    ({ title, description, value, setValue }, ref) => {
        const [open, setOpen] = useState(false);

        const parsedValue = useMemo(() => {
            return value || '#FFFFFF';
        }, [value]);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            if (newValue.startsWith('#') && newValue.length <= 7) {
                setValue(newValue.toUpperCase());
            } else if (!newValue.startsWith('#') && newValue.length <= 6) {
                setValue(`#${newValue.toUpperCase()}`);
            }
        };

        return (
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Paintbrush className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <CardTitle className="text-lg">{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </div>
                        </div>
                        <Popover
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-10 h-10"
                                    style={{ backgroundColor: parsedValue }}
                                    onClick={() => setOpen(true)}
                                >
                                    <div />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-4 w-64">
                                <div className="space-y-4">
                                    {/* Color Gradient Area */}
                                    <div
                                        className="w-full h-32 rounded-md cursor-crosshair relative"
                                        style={{
                                            backgroundImage: `
                      linear-gradient(to bottom, transparent, #000),
                      linear-gradient(to right, #fff, transparent)
                    `,
                                            backgroundColor: parsedValue,
                                        }}
                                        onClick={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const x = e.clientX - rect.left;
                                            const y = e.clientY - rect.top;

                                            // 클릭 위치에 따른 색상 계산 로직
                                            const saturation = (x / rect.width) * 100;
                                            const brightness = 100 - (y / rect.height) * 100;

                                            // HSB to Hex 변환 로직 (간단한 버전)
                                            const rgb = hsb2rgb(
                                                extractHue(parsedValue),
                                                saturation,
                                                brightness,
                                            );
                                            const hex = rgb2hex(rgb.r, rgb.g, rgb.b);
                                            setValue(hex);
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
                                            const x = e.clientX - rect.left;
                                            const hue = (x / rect.width) * 360;

                                            // 현재 채도와 밝기를 유지하면서 색조만 변경
                                            const { s, b } = hex2hsb(parsedValue);
                                            const rgb = hsb2rgb(hue, s, b);
                                            const hex = rgb2hex(rgb.r, rgb.g, rgb.b);
                                            setValue(hex);
                                        }}
                                    />

                                    {/* Hex Input */}
                                    <Input
                                        ref={ref}
                                        value={parsedValue}
                                        onChange={handleInputChange}
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
    },
);

ColorPicker.displayName = 'ColorPicker';

// Color conversion utilities
function hex2hsb(hex: string): { h: number; s: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, b: 0 };

    const r = parseInt(result[1] ?? '00', 16) / 255;
    const g = parseInt(result[2] ?? '00', 16) / 255;
    const b = parseInt(result[3] ?? '00', 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;

    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: h * 360,
        s: s * 100,
        b: v * 100,
    };
}

function hsb2rgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
    h = (h % 360) / 60;
    s = s / 100;
    v = v / 100;

    const i = Math.floor(h);
    const f = h - i;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));

    let r = 0,
        g = 0,
        b = 0;

    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default:
            r = v;
            g = p;
            b = q;
            break;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

function rgb2hex(r: number, g: number, b: number): string {
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function extractHue(hex: string): number {
    return hex2hsb(hex).h;
}
