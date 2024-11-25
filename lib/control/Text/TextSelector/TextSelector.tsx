import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TextSelect } from 'lucide-react';

type CommonControlProps = {
    title: string;
    description: string;
};

type TextSelectorControlProps = CommonControlProps & {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    select: string[];
    option?: {
        defaultValue?: string;
        placeholder?: string;
    };
};

export const TextSelectorControl: React.FC<TextSelectorControlProps> = ({
    title,
    description,
    selected,
    setSelected,
    select,
    option,
}) => {
    // 선택지가 없는 경우 기본값 처리
    React.useEffect(() => {
        if (!selected && select.length > 0) {
            if (option?.defaultValue && select.includes(option.defaultValue)) {
                setSelected(option.defaultValue);
            }
        }
    }, [select, selected, setSelected, option?.defaultValue]);

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center space-x-2">
                    <TextSelect className="w-4 h-4 text-muted-foreground" />
                    <div>
                        <CardTitle className="text-lg">{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Select
                    value={selected}
                    onValueChange={setSelected}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={option?.placeholder || '선택하세요'} />
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
