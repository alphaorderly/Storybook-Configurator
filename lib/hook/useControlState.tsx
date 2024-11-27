import { useState } from 'react';

export const useControlState = <S extends Record<string, unknown>>(initialState: S) => {
    const stateEntries = Object.entries(initialState).map(([key, value]) => {
        const [fieldState, setFieldState] = useState(value);
        return [key, fieldState, setFieldState] as const;
    });

    const state = stateEntries.reduce((acc, [key, fieldState]) => {
        acc[key as keyof S] = fieldState as S[keyof S];
        return acc;
    }, {} as S);

    const setStates = stateEntries.reduce(
        (acc, [key, , setFieldState]) => {
            acc[key as keyof S] = setFieldState;
            return acc;
        },
        {} as { [K in keyof S]: React.Dispatch<React.SetStateAction<S[K]>> },
    );

    return [state, setStates] as const;
};
