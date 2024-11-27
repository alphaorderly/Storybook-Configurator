# Storybook Configurator

A versatile tool to set up your components interactively and efficiently.

## Table of Contents

-   [Dashboard Component](#dashboard-component)
-   [State Management](#state-management)
-   [Control Components](#control-components)

## Common Props

The following props are shared across all components:

| Prop          | Type   | Description                  |
| ------------- | ------ | ---------------------------- |
| `title`       | string | Title of the component       |
| `description` | string | Description of the component |

## Dashboard Component

<img width="2354" alt="image" src="https://github.com/user-attachments/assets/4d773c35-e3a8-4004-8011-df89d99f1e5c">

The Dashboard component acts as the primary container for your interactive stories.

### Props

| Prop       | Type                 | Description                                          |
| ---------- | -------------------- | ---------------------------------------------------- |
| `controls` | ReactNode[]          | Array of control components to be placed on the left |
| `option`   | { minWidth: number } | Configuration option for the dashboard               |
| `children` | ReactNode            | Components to display in the main area               |

#### option

-   minWidth : minimum width of control section

### Example Usage

<details>
<summary>Example Usage</summary>

```tsx
const [state, setState] = useControlState({
    numberarray: [1, 2, 3],
    numberinput: 1,
    numberslider: 1,
    objecteditor: { key: 'value' },
    colorpicker: '#ff0000',
    textarray: ['one', 'two', 'three'],
    textinput: 'text',
    textselect: 'o',
    booltoggle: true,
});

const textselectOptions = ['one', 'two', 'three'];

const controls = [
    <NumberArray
        title="Number Array"
        description="Modify an array of numbers"
        key="numberarray"
        value={state.numberarray}
        setValue={setState.numberarray}
    />,
    <NumberInput
        title="Number Input"
        description="Input a single number"
        key="numberinput"
        value={state.numberinput}
        setValue={setState.numberinput}
    />,
    <NumberSlider
        title="Number Slider"
        description="Slide to select a number"
        key="numberslider"
        value={state.numberslider}
        setValue={setState.numberslider}
        option={{
            showInput: false,
        }}
    />,
    <ObjectEditor
        title="Object Editor"
        description="Edit an object"
        key="objecteditor"
        value={state.objecteditor}
        setValue={setState.objecteditor}
    />,
    <ColorPicker
        title="Color Picker"
        description="Pick a color"
        key="colorpicker"
        value={state.colorpicker}
        setValue={setState.colorpicker}
    />,
    <TextArray
        title="Text Array"
        description="Modify an array of text"
        key="textarray"
        value={state.textarray}
        setValue={setState.textarray}
    />,
    <TextInput
        title="Text Input"
        description="Input a single text"
        key="textinput"
        value={state.textinput}
        setValue={setState.textinput}
    />,
    <TextSelector
        title="Text Selector"
        description="Select a text from options"
        key="textselect"
        value={state.textselect}
        setValue={setState.textselect}
        select={textselectOptions}
    />,
    <BoolToggle
        title="Boolean Toggle"
        description="Toggle a boolean value"
        key="booltoggle"
        value={state.booltoggle}
        setValue={setState.booltoggle}
    />,
];

return (
    <Dashboard
        controls={controls}
        title="Dashboard"
        description="This is Dashboard for storybook"
    >
        <div>
            <h2>Interactive Controls</h2>
            <ul>
                <li>Number Array: {state.numberarray.join(', ')}</li>
                <li>Number Input: {state.numberinput}</li>
                <li>Number Slider: {state.numberslider}</li>
                <li>Object Editor: {JSON.stringify(state.objecteditor)}</li>
                <li>
                    Color Picker:{' '}
                    <span style={{ color: state.colorpicker }}>{state.colorpicker}</span>
                </li>
                <li>Text Array: {state.textarray.join(', ')}</li>
                <li>Text Input: {state.textinput}</li>
                <li>Text Selector: {state.textselect}</li>
                <li>Boolean Toggle: {state.booltoggle ? 'true' : 'false'}</li>
            </ul>
        </div>
    </Dashboard>
);
```

</details>

## State Management

### useControlState Hook

The `useControlState` hook simplifies managing multiple states for controls in your Storybook.

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
state.numberarray; // Get the current state value

setState.numberarray([1, 3]); // Update the state with a new array
setState.numberarray((prev) => prev.filter((item) => item !== 1)); // Works like useState
```

## Control Components

### 1. NumberArray

<img width="291" alt="image" src="https://github.com/user-attachments/assets/46c61c79-66c2-4381-b365-7c87933265e9">

A component for modifying an array of numbers.

#### Example

```tsx
<NumberArray
    title="Number Array"
    description="Modify an array of numbers"
    key="numberarray"
    value={state.numberarray}
    setValue={setState.numberarray}
/>
```

#### Type

| Property   | Type                               | Required | Description              |
| ---------- | ---------------------------------- | -------- | ------------------------ |
| `value`    | number[]                           | Yes      | Current array of numbers |
| `setValue` | Dispatch<SetStateAction<number[]>> | Yes      | State setter function    |

### 2. NumberInput

<img width="290" alt="image" src="https://github.com/user-attachments/assets/8e22ef0a-1759-4468-8be5-d0e7d9e3cd66">

A component for entering a single numeric value.

#### Option

```tsx
option?: {
    min?: number;
    // Minimum allowable input
    max?: number;
    // Maximum allowable input
    step?: number;
    // Step intervals for the input buttons
};
```

#### Example

```tsx
<NumberInput
    title="Number Input"
    description="Input a single number"
    key="numberinput"
    value={state.numberinput}
    setValue={setState.numberinput}
/>
```

#### Type

| Property   | Type                              | Required | Description           |
| ---------- | --------------------------------- | -------- | --------------------- |
| `value`    | number                            | Yes      | Current number value  |
| `setValue` | Dispatch<SetStateAction<number\>> | Yes      | State setter function |
| `option`   | option                            | No       | Configuration options |

### 3. NumberSlider

<img width="286" alt="image" src="https://github.com/user-attachments/assets/ca8f5a8b-b77d-482c-82e1-494d198c6843">

A slider for selecting numeric values.

#### Option

```tsx
option?: {
    min?: number;
    // Minimum slider value
    max?: number;
    // Maximum slider value
    step?: number;
    // Step increment for the slider
    showInput?: boolean;
    // Display an input box below the slider
};
```

#### Example

```tsx
<NumberSlider
    title="Number Slider"
    description="Slide to select a number"
    key="numberslider"
    value={state.numberslider}
    setValue={setState.numberslider}
    option={{
        showInput: false,
    }}
/>
```

#### Type

| Property   | Type                              | Required | Description                  |
| ---------- | --------------------------------- | -------- | ---------------------------- |
| `value`    | number                            | Yes      | Current slider value         |
| `setValue` | Dispatch<SetStateAction<number\>> | Yes      | State setter function        |
| `option`   | option                            | No       | Slider configuration options |

### 4. ObjectEditor

<img width="291" alt="image" src="https://github.com/user-attachments/assets/f60cde83-7937-4e6b-9fc8-6d671b12d81a">

A component for editing objects and arrays.

#### Option

```tsx
option?: {
    height?: string;
    // Editor display height
    readOnly?: boolean;
    // Specifies if the editor is read-only
};
```

#### Example

```tsx
<ObjectEditor
    title="Object Editor"
    description="Edit an object"
    key="objecteditor"
    value={state.objecteditor}
    setValue={setState.objecteditor}
/>
```

#### Type

| Property   | Type                               | Required | Description                  |
| ---------- | ---------------------------------- | -------- | ---------------------------- |
| `value`    | unknown                            | Yes      | Current object value         |
| `setValue` | Dispatch<SetStateAction<unknown\>> | Yes      | State setter function        |
| `option`   | ObjectEditorOptions                | No       | Editor configuration options |

### 5. ColorPicker

<img width="288" alt="image" src="https://github.com/user-attachments/assets/a9311081-cecd-4be3-b16a-9845fb52fd7c">

A component for selecting and displaying colors.

#### Example

```tsx
<ColorPicker
    title="Color Picker"
    description="Pick a color"
    key="colorpicker"
    value={state.colorpicker}
    setValue={setState.colorpicker}
/>
```

#### Type

| Property   | Type                              | Required | Description                      |
| ---------- | --------------------------------- | -------- | -------------------------------- |
| `value`    | string                            | Yes      | Current color value (hex format) |
| `setValue` | Dispatch<SetStateAction<string\>> | Yes      | State setter function            |

### 6. TextArray

<img width="287" alt="image" src="https://github.com/user-attachments/assets/630b1519-2eb5-474f-aeee-9d167f46cc78">

A component for managing an array of text values.

#### Example

```tsx
<TextArray
    title="Text Array"
    description="Modify an array of text"
    key="textarray"
    value={state.textarray}
    setValue={setState.textarray}
/>
```

#### Type

| Property   | Type                               | Required | Description              |
| ---------- | ---------------------------------- | -------- | ------------------------ |
| `value`    | string[]                           | Yes      | Current array of strings |
| `setValue` | Dispatch<SetStateAction<string[]>> | Yes      | State setter function    |

### 7. TextInput

<img width="286" alt="image" src="https://github.com/user-attachments/assets/af40d7e5-ed4f-4dcf-8528-d124530a77f9">

A component for entering text values.

#### Option

```tsx
option?: {
    placeholder?: string;
    // Placeholder text for the input field
    maxLength?: number;
    // Maximum character length allowed
};
```

#### Example

```tsx
<TextInput
    title="Text Input"
    description="Input a single text"
    key="textinput"
    value={state.textinput}
    setValue={setState.textinput}
/>
```

#### Type

| Property   | Type                              | Required | Description                 |
| ---------- | --------------------------------- | -------- | --------------------------- |
| `value`    | string                            | Yes      | Current text value          |
| `setValue` | Dispatch<SetStateAction<string\>> | Yes      | State setter function       |
| `option`   | option                            | No       | Input configuration options |

### 8. TextSelector

<img width="292" alt="image" src="https://github.com/user-attachments/assets/5da97138-fc9b-404b-86d7-adb530452d63">

A dropdown component for choosing from predefined options.

#### Example

```tsx
const textselectOptions = ['one', 'two', 'three'];

<TextSelector
    title="Text Selector"
    description="Select a text from options"
    key="textselect"
    value={state.textselect}
    setValue={setState.textselect}
    select={textselectOptions}
/>;
```

#### Type

| Property   | Type                              | Required | Description                 |
| ---------- | --------------------------------- | -------- | --------------------------- |
| `value`    | string                            | Yes      | Current selected value      |
| `setValue` | Dispatch<SetStateAction<string\>> | Yes      | State setter function       |
| `select`   | string[]                          | Yes      | Array of selectable options |

### 9. BoolToggle

<img width="286" alt="image" src="https://github.com/user-attachments/assets/b0fa26fa-3cd1-4146-bbb5-e32ebd2aa60c">

A switch for toggling boolean values.

#### Example

```tsx
<BoolToggle
    title="Boolean Toggle"
    description="Toggle a boolean value"
    key="booltoggle"
    value={state.booltoggle}
    setValue={setState.booltoggle}
/>
```

#### Type

| Property   | Type                               | Required | Description           |
| ---------- | ---------------------------------- | -------- | --------------------- |
| `value`    | boolean                            | Yes      | Current toggle state  |
| `setValue` | Dispatch<SetStateAction<boolean\>> | Yes      | State setter function |
