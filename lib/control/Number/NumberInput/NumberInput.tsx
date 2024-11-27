import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import type { CommonProps } from '@/types/Props';

type NumberInputProps = {
    key: number;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    option?: {
        min?: number;
        max?: number;
        step?: number;
    };
} & CommonProps;

export const NumberInput: React.FC<NumberInputProps> = ({
    title,
    description,
    value,
    setValue,
    option = {},
}) => {
    const { min = -Infinity, max = Infinity, step = 1 } = option;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            setValue(newValue);
        }
    };

    const increment = () => {
        const newValue = value + step;
        if (newValue <= max) {
            setValue(newValue);
        }
    };

    const decrement = () => {
        const newValue = value - step;
        if (newValue >= min) {
            setValue(newValue);
        }
    };

    return (
        <Card className="w-full p-4">
            <CardHeader className="p-0 mb-4 space-y-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <CardDescription className="text-xs">{description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        value={value}
                        onChange={handleInputChange}
                        min={min}
                        max={max}
                        step={step}
                    />
                    <div className="flex gap-1">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={decrement}
                            disabled={value <= min}
                            className="px-2"
                        >
                            <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={increment}
                            disabled={value >= max}
                            className="px-2"
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
