import { useState } from 'react';

export const useControlState = <S extends Record<string, unknown>>(initialState: S) => {
    const [state, setState] = useState<S>(initialState);

    const setControlState = <K extends keyof S>(key: K, value: unknown) => {
        setState((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return [state, setControlState] as const;
};
