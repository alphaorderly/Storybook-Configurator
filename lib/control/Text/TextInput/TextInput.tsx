import React, { type FC } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { CommonProps } from '@/types/Props';

type TextInputProps = CommonProps & {
    key: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    option?: {
        placeholder?: string;
        maxLength?: number;
    };
};

export const TextInput: FC<TextInputProps> = ({ title, description, value, setValue, option }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (option?.maxLength && newValue.length > option.maxLength) return;
        setValue(newValue);
    };

    return (
        <Card className="w-full p-4 space-y-4">
            <CardHeader className="p-0">
                <div className="space-y-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <CardDescription className="text-xs">{description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-2">
                    <Input
                        value={value}
                        onChange={handleChange}
                        placeholder={option?.placeholder}
                        className="w-full"
                    />
                    {option?.maxLength && (
                        <p className="text-sm text-muted-foreground text-right">
                            {value.length} / {option.maxLength}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
