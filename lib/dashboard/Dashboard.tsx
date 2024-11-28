import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { CommonProps } from '@/types/Props';
import type React from 'react';
import type { FC, PropsWithChildren } from 'react';

type DashboardProps = PropsWithChildren<
    {
        controls: React.ReactNode[];
        option?: {
            minWidth: string;
        };
    } & CommonProps
>;

export const Dashboard: FC<DashboardProps> = ({
    title,
    description,
    controls,
    children,
    option,
}) => {
    const { minWidth = '300px' } = option || {};

    return (
        <Card className="flex flex-col h-screen rounded-none">
            <CardHeader className="border-b border-gray-400  bg-white">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex divide-x-2 p-0 overflow-scroll">
                <div
                    className="flex flex-col self-stretch items-center justify-start overflow-y-scroll p-4 gap-4"
                    style={{
                        minWidth,
                    }}
                >
                    {controls}
                </div>
                <div className="flex flex-col self-stretch items-center justify-center overflow-auto flex-1">
                    {children}
                </div>
            </CardContent>
        </Card>
    );
};
