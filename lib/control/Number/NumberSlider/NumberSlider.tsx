import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import type { CommonProps } from '@/types/Props';

type NumberSliderProps = {
    value: number;
    setValue: (value: number) => void;
    option?: {
        min?: number;
        max?: number;
        step?: number;
        showInput?: boolean;
    };
} & CommonProps;

export const NumberSlider: React.FC<NumberSliderProps> = ({
    title,
    description,
    value,
    setValue,
    option = {},
}) => {
    const { min = 0, max = 100, step = 1, showInput = true } = option;

    const handleSliderChange = (newValue: number[]) => {
        if (newValue[0] !== undefined) setValue(newValue[0]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            setValue(newValue);
        }
    };

    return (
        <Card className="w-full p-4">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <CardDescription className="text-xs">{description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex flex-col gap-4">
                    <Slider
                        value={[value]}
                        min={min}
                        max={max}
                        step={step}
                        onValueChange={handleSliderChange}
                        className="w-full"
                    />
                    {showInput && (
                        <Input
                            type="number"
                            value={value}
                            onChange={handleInputChange}
                            min={min}
                            max={max}
                            step={step}
                            className="w-24"
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
