import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Plus, Trash2, Pencil, Check, X, GripVertical } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type NumberArrayProps = {
    key: number;
    title: string;
    description: string;
    value: number[];
    setValue: React.Dispatch<React.SetStateAction<number[]>>;
};

export const NumberArray: React.FC<NumberArrayProps> = ({
    title,
    description,
    value,
    setValue,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newValue, setNewValue] = useState<string>('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

    const handleAddValue = () => {
        const numberValue = Number(newValue);
        if (!isNaN(numberValue)) {
            setValue((prev) => [...prev, numberValue]);
            setNewValue('');
        }
    };

    const handleRemoveValue = (index: number) => {
        setValue((prev) => prev.filter((_, i) => i !== index));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (editingIndex !== null) {
                handleSaveEdit();
            } else if (newValue !== '') {
                handleAddValue();
            }
        }
    };

    const startEditing = (index: number) => {
        setEditingIndex(index);
        if (value[index] !== undefined) setEditValue(value[index]!.toString());
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            const numberValue = Number(editValue);
            if (!isNaN(numberValue)) {
                setValue((prev) => prev.map((v, i) => (i === editingIndex ? numberValue : v)));
            }
            setEditingIndex(null);
            setEditValue('');
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditValue('');
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnter = (index: number) => {
        if (draggedIndex === null || draggedIndex === index) return;
        setDragOverIndex(index);

        // 이전 타임아웃 취소
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }

        // 새로운 위치로 이동
        timeoutRef.current = window.setTimeout(() => {
            setValue((prev) => {
                const newArray = [...prev];
                const [draggedItem] = newArray.splice(draggedIndex, 1);
                newArray.splice(index, 0, draggedItem ?? 0);
                setDraggedIndex(index);
                return newArray;
            });
        }, 200);
    };

    return (
        <Card className="w-full p-4">
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <CardHeader className="p-0 mb-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-sm font-medium">{title}</CardTitle>
                            <CardDescription className="text-xs">{description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                {value.length} items
                            </span>
                            <CollapsibleTrigger className="hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                                {isOpen ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                            </CollapsibleTrigger>
                        </div>
                    </div>
                </CardHeader>

                <CollapsibleContent>
                    <CardContent className="p-0 space-y-4">
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                value={newValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter a number"
                                className="w-full"
                            />
                            <Button
                                onClick={handleAddValue}
                                variant="outline"
                                className="whitespace-nowrap"
                                disabled={newValue === ''}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {value.map((num, index) => (
                                <div
                                    key={index}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={handleDragOver}
                                    onDragEnter={() => handleDragEnter(index)}
                                    className={`flex items-center gap-2 group rounded-md transition-all duration-200 ${
                                        draggedIndex === index
                                            ? 'opacity-50'
                                            : dragOverIndex === index
                                              ? 'translate-y-1'
                                              : ''
                                    }`}
                                >
                                    <div className="cursor-grab opacity-0 group-hover:opacity-100 transition-opacity px-1">
                                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    {editingIndex === index ? (
                                        <>
                                            <Input
                                                type="number"
                                                value={editValue}
                                                onChange={handleEditChange}
                                                onKeyPress={handleKeyPress}
                                                className="flex-1"
                                                autoFocus
                                            />
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleSaveEdit}
                                                >
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleCancelEdit}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex-1 p-2 border rounded-md bg-background">
                                                {num}
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => startEditing(index)}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleRemoveValue(index)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
};
