# Storybook Configurator

A powerful tool to set up your stories interactively and easily.

## Table of Contents

-   [Dashboard Component](#dashboard-component)
-   [State Management](#state-management)
-   [Control Components](#control-components)

## Common Props

All components share these base props:

| Prop          | Type   | Description                  |
| ------------- | ------ | ---------------------------- |
| `title`       | string | Title of the component       |
| `description` | string | Description of the component |

## Dashboard Component

![picture 11](images/b6fead041fd8efb0ef39f1efee8a6f27e304305b58fa3afede290aa8c7b16d4c.png)

The Dashboard component serves as the main container for your interactive stories.

### Props

| Prop       | Type                 | Description                                          |
| ---------- | -------------------- | ---------------------------------------------------- |
| `controls` | Control[]            | Array of control components to be placed on the left |
| `options`  | { minWidth: number } | Configuration options for the dashboard              |
| `children` | ReactNode            | Components to display in the main area               |

### Example Usage

```tsx
<Dashboard
    controls={controls}
    title="Dashboard"
    description="This is Dashboard for storybook"
>
    <YourComponent />
</Dashboard>
```

## State Management

### useControlState Hook

The `useControlState` hook provides an easy way to manage multiple states for your controls.

```tsx
const [state, setState] = useControlState({
    numberarray: [1, 2, 3],
    numberinput: 1,
    numberslider: 1,
    objecteditor: { key: 'value' },
    colorpicker: '#ff0000',
    textarray: ['one', 'two', 'three'],
    textinput: 'text',
    textselect: 'one',
    booltoggle: true,
});

// Usage
state.numberarray; // Get state value
setState('numberarray', newValue); // Set state value
```

## Control Components

### 1. NumberArray

![picture 12](images/0a4a92f6e7d8d9c53f48474db8021d31adcf7950da0ba12fc5d4771c26ebfdc8.png)

A component to modify an array of numbers.

```tsx
<NumberArray
    title="Number Array"
    description="Modify an array of numbers"
    value={state.numberarray}
    setValue={(value: number[]) => setState('numberarray', value)}
/>
```

### 2. NumberInput

![picture 14](images/8070eb0491350db5089e2e87687593e8f6375366ce47d12b6a1af095d41e6deb.png)

Input component for single number values.

#### Options

```tsx
type NumberInputOptions = {
    min?: number; // Minimum possible value
    max?: number; // Maximum possible value
    step?: number; // Step for click event
};
```

```tsx
<NumberInput
    title="Number Input"
    description="Input a single number"
    value={state.numberinput}
    setValue={(value: number) => setState('numberinput', value)}
    options={{ min: 0, max: 100, step: 1 }}
/>
```

### 3. NumberSlider

![picture 15](images/e18b6844f8ad9282c821725ad57477328a8742ec8a67121bdde3237ff514bd79.png)

A slider component for number values.

#### Options

```tsx
type NumberSliderOptions = {
    min?: number; // Minimum possible value
    max?: number; // Maximum possible value
    step?: number; // Step for slider
    showInput?: boolean; // Show explicit input
};
```

```tsx
<NumberSlider
    title="Number Slider"
    description="Slide to select a number"
    value={state.numberslider}
    setValue={(value: number) => setState('numberslider', value)}
    options={{ min: 0, max: 100, step: 1, showInput: true }}
/>
```

### 4. ObjectEditor

![picture 16](images/763ce868e7665b367d7de8c9697eebf964361b2827e104266e812dbed109fe75.png)

An editor for objects and arrays.

#### Options

```tsx
type ObjectEditorOptions = {
    height?: string; // Height for editor
    readOnly?: boolean; // Read only flag
};
```

```tsx
<ObjectEditor
    title="Object Editor"
    description="Edit an object"
    value={state.objecteditor}
    setValue={(value: unknown) => setState('objecteditor', value)}
    options={{ height: '300px' }}
/>
```

### 5. ColorPicker

![picture 17](images/2dafdfac91fe7248a295863dce811541cd582837e0b42d9c10bc3697d10a6a82.png)

A component for selecting colors.

```tsx
<ColorPicker
    title="Color Picker"
    description="Pick a color"
    value={state.colorpicker}
    setValue={(value: string) => setState('colorpicker', value)}
/>
```

### 6. TextArray

![picture 18](images/b824760daeaa98cf0e5d59c9cbbaf8867e46ce4bcc879178ee3ea58aa7932719.png)

Modify an array of text values.

```tsx
<TextArray
    title="Text Array"
    description="Modify an array of text"
    value={state.textarray}
    setValue={(value: string[]) => setState('textarray', value)}
/>
```

### 7. TextInput

![picture 19](images/76d2879d426a67a57bbbfaf9443b1a15c3784cb3a243170c2f729aac9560c525.png)

Input component for text values.

#### Options

```tsx
type TextInputOptions = {
    placeholder?: string; // Placeholder for input
    maxLength?: number; // Maximum length of text
};
```

```tsx
<TextInput
    title="Text Input"
    description="Input a single text"
    value={state.textinput}
    setValue={(value: string) => setState('textinput', value)}
    options={{ placeholder: 'Enter text...', maxLength: 100 }}
/>
```

### 8. TextSelector

![picture 20](images/98c48ece4529fa61cb228f40b31889cd88358d967d3c5f2aa44f6155d4824447.png)

A dropdown component to select from predefined options.

```tsx
const options = ['one', 'two', 'three'];

<TextSelector
    title="Text Selector"
    description="Select a text from options"
    value={state.textselect}
    selected={state.textselect}
    setSelected={(value: string) => setState('textselect', value)}
    select={options}
/>;
```

### 9. BoolToggle

![picture 21](images/b5b9f578ce61adbd3fe0dec76d83a6d2b84a34b1d8e8a4637997bd9dec4d3f2e.png)

A toggle component for boolean values.

```tsx
<BoolToggle
    title="Boolean Toggle"
    description="Toggle a boolean value"
    value={state.booltoggle}
    setValue={(value: boolean) => setState('booltoggle', value)}
/>
```
