import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Braces, Copy, Check } from 'lucide-react';

type CommonControlProps = {
    title: string;
    description: string;
};

type ObjectEditorControlProps<T> = CommonControlProps & {
    object: T;
    setObject: React.Dispatch<React.SetStateAction<T>>;
    option?: {
        height?: string;
        readOnly?: boolean;
    };
};

export function ObjectEditorControl<T extends object>({
    title,
    description,
    object,
    setObject,
    option,
}: ObjectEditorControlProps<T>): JSX.Element {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const editorRef = useRef(null);

    const handleCopy = () => {
        const editor: {
            getValue: () => string | undefined;
        } = editorRef.current ?? { getValue: () => undefined };

        const value = editor.getValue();
        if (value) {
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Braces className="w-4 h-4 text-muted-foreground" />
                        <div>
                            <CardTitle className="text-lg">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
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
            <CardContent>
                <div className="space-y-2">
                    <Editor
                        height={option?.height || '200px'}
                        defaultLanguage="json"
                        defaultValue={JSON.stringify(object, null, 2)}
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
                                setObject(parsed);
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
}
