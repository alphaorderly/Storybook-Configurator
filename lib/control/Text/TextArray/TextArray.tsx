import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Plus, Trash2, Pencil, Check, X, GripVertical } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { CommonProps } from '@/types/Props';
import { twMerge } from 'tailwind-merge';

type TextArrayProps = CommonProps & {
    value: string[];
    setValue: React.Dispatch<React.SetStateAction<string[]>>;
    option?: {
        placeholder?: string;
        maxLength?: number;
    };
};

export const TextArray: React.FC<TextArrayProps> = ({
    title,
    description,
    value,
    setValue,
    option,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newValue, setNewValue] = useState<string>('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

    const handleAddValue = () => {
        if (newValue.trim()) {
            if (option?.maxLength && newValue.length > option.maxLength) return;
            setValue([...value, newValue.trim()]);
            setNewValue('');
        }
    };

    const handleRemoveValue = (index: number) => {
        setValue(value.filter((_, i) => i !== index));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (option?.maxLength && value.length > option.maxLength) return;
        setNewValue(value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (editingIndex !== null) {
                handleSaveEdit();
            } else if (newValue.trim() !== '') {
                handleAddValue();
            }
        }
    };

    const startEditing = (index: number) => {
        setEditingIndex(index);
        setEditValue(value[index] || '');
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (option?.maxLength && value.length > option.maxLength) return;
        setEditValue(value);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null && editValue.trim()) {
            setValue(value.map((v, i) => (i === editingIndex ? editValue.trim() : v)));
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

        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            setValue(
                (() => {
                    const newArray = [...value];
                    const [draggedItem] = newArray.splice(draggedIndex, 1);
                    newArray.splice(index, 0, draggedItem || '');
                    setDraggedIndex(index);
                    return newArray;
                })(),
            );
        }, 200);
    };

    return (
        <Card className={twMerge(['w-full', isOpen ? 'p-4' : 'px-4 pt-4'])}>
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <CardHeader className="p-0 mb-4">
                    <div className="space-y-2">
                        <CardTitle className="text-sm font-medium">{title}</CardTitle>
                        <CardDescription className="text-xs">{description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{value.length} items</span>
                        <CollapsibleTrigger className="hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                            {isOpen ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </CollapsibleTrigger>
                    </div>
                </CardHeader>

                <CollapsibleContent>
                    <CardContent className="p-0 space-y-4">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                value={newValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}
                                placeholder={option?.placeholder || '추가할 텍스트 입력'}
                                className="w-full"
                            />
                            <Button
                                onClick={handleAddValue}
                                variant="outline"
                                className="whitespace-nowrap"
                                disabled={!newValue.trim()}
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {value.map((text, index) => (
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
                                    <div className="cursor-grab transition-opacity px-1">
                                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    {editingIndex === index ? (
                                        <>
                                            <Input
                                                type="text"
                                                value={editValue}
                                                onChange={handleEditChange}
                                                onKeyDown={handleKeyPress}
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
                                                {text}
                                            </div>
                                            <div className=" transition-opacity flex gap-1">
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
