import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { CommonProps } from '@/types/Props';

type TextSelectorProps = CommonProps & {
    value: string;
    setValue: (value: string) => void;
    select: string[];
};

export const TextSelector: React.FC<TextSelectorProps> = ({
    title,
    description,
    value,
    setValue,
    select,
}) => {
    React.useEffect(() => {
        if (!value && select.length > 0) {
            if (select.includes(value)) {
                setValue(value);
            }
        }
    }, [select, value, setValue]);

    return (
        <Card className="w-full p-4 space-y-4">
            <CardHeader className="p-0">
                <div className="space-y-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <CardDescription className="text-xs">{description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Select
                    value={value}
                    onValueChange={setValue}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={value} />
                    </SelectTrigger>
                    <SelectContent>
                        {select.map((item) => (
                            <SelectItem
                                key={item}
                                value={item}
                            >
                                {item}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
};
