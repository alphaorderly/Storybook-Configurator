import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { CommonProps } from '@/types/Props';
import type { FC } from 'react';

type TextAreaProps = CommonProps & {
    key: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    option?: {
        placeholder?: string;
        maxLength?: number;
        maxLines?: number;
    };
};

export const TextArea: FC<TextAreaProps> = ({ title, description, value, setValue, option }) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        if (option?.maxLength && newValue.length > option.maxLength) return;
        if (option?.maxLines && newValue.split('\n').length > option.maxLines) return;
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
                    <Textarea
                        value={value}
                        onChange={handleChange}
                        placeholder={option?.placeholder}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        style={{ resize: 'none' }}
                    />
                    {option?.maxLength && (
                        <p className="text-sm text-muted-foreground text-left">
                            {value.length} / {option.maxLength} characters
                        </p>
                    )}
                    {option?.maxLines && (
                        <p className="text-sm text-muted-foreground text-left">
                            {value.split('\n').length} / {option.maxLines} lines
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
