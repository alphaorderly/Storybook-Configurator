import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type React from 'react';
import type { FC } from 'react';

type DashboardProps = {
    title: string;
    description: string;
    controls: React.ReactNode[];
    component: React.ReactNode;
};

export const Dashboard: FC<DashboardProps> = ({ title, description, controls, component }) => {
    return (
        <Card className="flex flex-col h-full rounded-none">
            <CardHeader className="border-b border-gray-400">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex divide-x-2 p-0 h-full">
                <div className="flex flex-col self-stretch items-center justify-start overflow-y-scroll min-w-[300px] p-4">
                    {controls}
                </div>
                <div className="flex flex-col self-stretch items-center justify-center overflow-auto flex-1 p-2">
                    {component}
                </div>
            </CardContent>
        </Card>
    );
};
