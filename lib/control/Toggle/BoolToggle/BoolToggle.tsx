import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { CommonProps } from '@/types/Props';

type BoolToggleProps = {
    value: boolean;
    setValue: (value: boolean) => void;
    option?: {
        disabled?: boolean;
        onLabel?: string;
        offLabel?: string;
        size?: 'default' | 'large';
    };
} & CommonProps;

export const BoolToggle: React.FC<BoolToggleProps> = ({
    title,
    description,
    value,
    setValue,
    option,
}) => {
    const onLabel = option?.onLabel || 'ON';
    const offLabel = option?.offLabel || 'OFF';
    const size = option?.size || 'default';

    return (
        <Card className="w-full p-4 space-y-4">
            <CardHeader className="p-0">
                <div className="space-y-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <CardDescription className="text-xs">{description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex items-center">
                    <div
                        role="group"
                        aria-label={title}
                        className={cn(
                            'relative inline-flex items-center rounded-lg border bg-muted',
                            option?.disabled && 'opacity-50 pointer-events-none',
                            size === 'large' ? 'h-10' : 'h-8',
                        )}
                    >
                        <div
                            className={cn(
                                'absolute z-0 rounded-md bg-background shadow-sm transition-all duration-200 ease-out',
                                size === 'large' ? 'h-8 w-[68px]' : 'h-6 w-[60px]',
                                value ? 'translate-x-[calc(100%-4px)]' : 'translate-x-1',
                            )}
                        />

                        <button
                            onClick={() => !value || setValue(false)}
                            className={cn(
                                'relative z-10 transition-colors duration-200 font-medium',
                                size === 'large'
                                    ? 'h-8 px-4 text-sm min-w-[68px]'
                                    : 'h-6 px-3 text-xs min-w-[60px]',
                                !value
                                    ? 'text-foreground'
                                    : 'text-muted-foreground hover:text-foreground',
                            )}
                        >
                            {offLabel}
                        </button>

                        <button
                            onClick={() => value || setValue(true)}
                            className={cn(
                                'relative z-10 transition-colors duration-200 font-medium',
                                size === 'large'
                                    ? 'h-8 px-4 text-sm min-w-[68px]'
                                    : 'h-6 px-3 text-xs min-w-[60px]',
                                value
                                    ? 'text-foreground'
                                    : 'text-muted-foreground hover:text-foreground',
                            )}
                        >
                            {onLabel}
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
