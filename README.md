## Storybook Configurator

#### Setup your story INTERACTIVE and EASY

---

### Docs

-   EVERY components has same common props
    -   title ( string )
        -   title of this component
    -   description ( string )
        -   description of this component

#### Dashboard

![picture 0](images/649b5fb6c80d0304abea79ef0c7f145f5da9664242e874c5e8a4ce6cc3051817.png)

##### props

-   **controls**

    -   array of control components, will be place on left

-   options

```
{
    minWidth: number
}
```

-   minimum width of control portion

-   children
    -   component to show

<details>
<summary>코드 보기</summary>
<pre><code>
() => {
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

        const textselectOptions = ['one', 'two', 'three'];

        const controls = [
            <NumberArray
                title="Number Array"
                description="Modify an array of numbers"
                key="numberarray"
                value={state.numberarray}
                setValue={(value: number[]) => setState('numberarray', value)}
            />,
            <NumberInput
                title="Number Input"
                description="Input a single number"
                key="numberinput"
                value={state.numberinput}
                setValue={(value: number) => setState('numberinput', value)}
            />,
            <NumberSlider
                title="Number Slider"
                description="Slide to select a number"
                key="numberslider"
                value={state.numberslider}
                setValue={(value: number) => setState('numberslider', value)}
            />,
            <ObjectEditor
                title="Object Editor"
                description="Edit an object"
                key="objecteditor"
                value={state.objecteditor}
                setValue={(value: unknown) => setState('objecteditor', value)}
            />,
            <ColorPicker
                title="Color Picker"
                description="Pick a color"
                key="colorpicker"
                value={state.colorpicker}
                setValue={(value: string) => setState('colorpicker', value)}
            />,
            <TextArray
                title="Text Array"
                description="Modify an array of text"
                key="textarray"
                value={state.textarray}
                setValue={(value: string[]) => setState('textarray', value)}
            />,
            <TextInput
                title="Text Input"
                description="Input a single text"
                key="textinput"
                value={state.textinput}
                setValue={(value: string) => setState('textinput', value)}
            />,
            <TextSelector
                title="Text Selector"
                description="Select a text from options"
                key="textselect"
                value={state.textselect}
                selected={state.textselect}
                setSelected={(value: string) => setState('textselect', value)}
                select={textselectOptions}
            />,
            <BoolToggle
                title="Boolean Toggle"
                description="Toggle a boolean value"
                key="booltoggle"
                value={state.booltoggle}
                setValue={(value: boolean) => setState('booltoggle', value)}
            />,
        ];

        return (
            <Dashboard
                controls={controls}
                title="Dashboard"
                description="This is Dashboard for storybook"
            >
                <input type="text" />
            </Dashboard>
        );
    }

</code></pre>

</details>

---

### Controls and Hooks

#### useControlState

-   Can manage multiple states easily

```
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
```

-   Each key is states and value is default value
-   Automatically create a state

```
state.numberarray
// Value of state

setState('numberarray', value)
// set Value on state
```

### Controls

-   Every control component has Common props
    -   value ( state.{key} from useControlStates)
    -   setValue ( follow example of each control )
    -   key ( unique value for each controls )

#### NumberArray

-   Modify number array for component

![picture 1](images/d1f0719c88f1338f1ff4d807bf0931b9bcbd13a995ce72dafe6ae1e0d1aaf85c.png)

```
<NumberArray
    title="Number Array"
    description="Modify an array of numbers"
    key="numberarray"
    value={state.numberarray}
    setValue={(value: number[]) => setState('numberarray', value)}
/>,
```

#### NumberInput

-   Modify number for component

![picture 2](images/e8eab63fb86ec15f654b57ab855e2c07894976a5b142895272d3398c77f8a46b.png)

##### option props

```
option?: {
    min?: number;
    // minimum possible value
    max?: number;
    // maximum possible value
    step?: number;
    // step for click event
};
```

```
<NumberInput
    title="Number Input"
    description="Input a single number"
    key="numberinput"
    value={state.numberinput}
    setValue={(value: number) => setState('numberinput', value)}
/>
```

#### Number Slider

-   Slider for number state

![picture 3](images/61413cbfbe64f576682800cb3a748e32012d7264dce9dd20a05b9daf42b9143e.png)

##### option props

```
option?: {
    min?: number;
    // minimum possible value
    max?: number;
    // maximum possible value
    step?: number;
    // step for slider
    showInput?: boolean;
    // show explicit input
};
```

```
<NumberSlider
    title="Number Slider"
    description="Slide to select a number"
    key="numberslider"
    value={state.numberslider}
    setValue={(value: number) => setState('numberslider', value)}
/>
```

#### Object Editor

-   Edit object/array

![picture 4](images/28eb64bb3d9bfcc7c0bf66ebc16b15c585d8c58e13d9b61dbd505c5632b7ac3c.png)

##### option props

```
option?: {
    height?: string;
    // height for editor
    readOnly?: boolean;
    // read only flag
};
```

```
<ObjectEditor
    title="Object Editor"
    description="Edit an object"
    key="objecteditor"
    value={state.objecteditor}
    setValue={(value: unknown) => setState('objecteditor', value)}
/>
```

#### Color picker

![picture 5](images/38b093f49be8a6d14ed4cb70512a0f8e485e6ab7a0d0517cbc7dd2243683e7dd.png)

-   pick color easily

```
<ColorPicker
    title="Color Picker"
    description="Pick a color"
    key="colorpicker"
    value={state.colorpicker}
    setValue={(value: string) => setState('colorpicker', value)}
/>
```

#### TextArray

![picture 6](images/0440ef1dd0a2e53077ce9c4dcfeb3b2e3cd7740b382826855ba3bdbebbf7a938.png)

-   Modify text array for component

```
<TextArray
    title="Text Array"
    description="Modify an array of text"
    key="textarray"
    value={state.textarray}
    setValue={(value: string[]) => setState('textarray', value)}
/>
```

#### TextInput

![picture 7](images/f0c6974a311adf9da6c44666072e2519a843faeed6c1d1129f9bf462242123c9.png)

-   Modify text state for component

##### option props

```
option?: {
    placeholder?: string;
    // placeholder for input
    maxLength?: number;
    // maximum length of text
};
```

```
<TextInput
    title="Text Input"
    description="Input a single text"
    key="textinput"
    value={state.textinput}
    setValue={(value: string) => setState('textinput', value)}
/>
```

#### TextSelector

![](images/accff7539a094bd2b36ed323b13c7969a9458751e066f6523fdbd76f2cba15b5.png)

-   Select text from list
-   this component need special prop named select

```

const textselectOptions = ['one', 'two', 'three'];
// What to choose

<TextSelector
    title="Text Selector"
    description="Select a text from options"
    key="textselect"
    value={state.textselect}
    selected={state.textselect}
    setSelected={(value: string) => setState('textselect', value)}
    select={textselectOptions}
/>
```

#### Boolean toggle

-   Toggle boolean value

![picture 10](images/f3e3f48193f7e9f76f822c2ff3600ea0d192bd1a401b7647298668c880a14ec9.png)

```
<BoolToggle
    title="Boolean Toggle"
    description="Toggle a boolean value"
    key="booltoggle"
    value={state.booltoggle}
    setValue={(value: boolean) => setState('booltoggle', value)}
/>
```
