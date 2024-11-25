import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PenLine } from 'lucide-react';

type CommonControlProps = {
    title: string;
    description: string;
};

type TextInputControlProps = CommonControlProps & {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    option?: {
        placeholder?: string;
        maxLength?: number;
    };
};

export const TextInputControl = ({
    title,
    description,
    value,
    setValue,
    option,
}: TextInputControlProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (option?.maxLength && newValue.length > option.maxLength) return;
        setValue(newValue);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <PenLine className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-lg">{title}</CardTitle>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
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
