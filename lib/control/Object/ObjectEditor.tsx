import React, { useRef, useState, type ReactNode } from 'react';
import Editor from '@monaco-editor/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Braces, Copy, Check } from 'lucide-react';
import type { CommonProps } from '@/types/Props';

type ObjectEditorProps<T> = {
    key: string;
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
    option?: {
        height?: string;
        readOnly?: boolean;
    };
} & CommonProps;

export const ObjectEditor = <T extends object>({
    title,
    description,
    value,
    setValue,
    option,
}: ObjectEditorProps<T>): ReactNode => {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const editorRef = useRef(null);

    const handleCopy = () => {
        const editor: {
            getValue: () => string | undefined;
        } = editorRef.current ?? { getValue: () => undefined };

        const value = editor.getValue();
        if (value) {
            navigator.clipboard.writeText(JSON.stringify(JSON.parse(value), null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Card className="w-full p-4 space-y-6">
            <CardHeader className="p-0">
                <div className="flex items-center justify-between">
                    <div className="flex justify-between items-center">
                        <div className="space-y-2">
                            <CardTitle className="text-sm font-medium">{title}</CardTitle>
                            <CardDescription className="text-xs">{description}</CardDescription>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-2">
                    <Editor
                        height={option?.height || '200px'}
                        defaultLanguage="json"
                        defaultValue={JSON.stringify(value, null, 2)}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            readOnly: option?.readOnly,
                            formatOnPaste: true,
                            formatOnType: true,
                            wordWrap: 'on',
                            automaticLayout: true,
                        }}
                        onMount={(editor) => {
                            editorRef.current = editor;
                        }}
                        onChange={(value: string | undefined) => {
                            if (value === undefined) return;
                            try {
                                if (value.trim() === '') {
                                    setError(null);
                                    return;
                                }

                                const parsed = JSON.parse(value) as T;
                                setValue(parsed);
                                setError(null);
                            } catch (err) {
                                setError('유효하지 않은 JSON 형식입니다.');
                            }
                        }}
                        theme="vs-light"
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
            </CardContent>
        </Card>
    );
};
