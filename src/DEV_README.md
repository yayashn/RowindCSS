# Developer Guide

## Structure
`elements` Contains the available tags, e.g: Div, Button, Text
`utils` Most importantly contains the `getClassValue` which is responsible for parsing the classNames and returning the correct value.
`values` Contains the isolated suffix non-arbitrary value types. For example blue-500. 
`classes.ts` Contains an object of className:Properties key-value pairs.
`types.ts` Contains all types.
`rowind.story.tsx` A story to test your UI using hoarcekat.

## Class Creation Example
To create the `w` (width) class:

Add it to the `classes.ts` object in this format:
```ts
    w: {
        valueTypes: ["udim"],
    },
```
The key is the name of the class.

The valueTypes property is an array that accepts all value types that this class can produce.
For example, `w` can be `w-40` which results in a udim value, but it can also be `w-auto` which
is a special behaviour. To add this we must update the properties like so:
```ts
    w: {
        valueTypes: ["udim", "special"],
    },
```
Now it knows that this class can produce 2 outcomes. But the `special` type needs 1 additional step - we have 
to include the special classes like so:
```ts
    w: {
        valueTypes: ["udim", "special"],
        specialValues: ["w-auto"]
    },
```

Sometimes you will need to explicitly create a new specific `valueType` for the class as none of the existing types support
its suffixes. For example, `border` can be `border-blue-500` which is a standard `color3` type, but it can also be
`border-4` which is not a reusable type. In this case you can add this type by creating `border.ts` in the `values` folder and
export an object containing its suffixes:
```ts
//border.ts
export default {
    "0": 0,
    "px": 1,
    "1": 1,
    "2": 2,
    "4": 4,
    "8": 8,
}
```

Then import and add it to `values/values.ts`
```ts
const values = {
    //...
    border
} 
```

Then specify a type for it in `types.ts`
```ts
export type BorderValueName = keyof typeof values.border
```

Then implement the type handling logic in `utils/getClassValue.ts`
```ts
const isBorder = classValueTypes.some(classValueType => classValueType === "border")
            && Object.keys(values.border).some(u => u === classValueString)
```

Now you can add `"border"` as valueType of the border class in `classes.ts`.
```ts
border: {
    valueTypes: ["color3", "border"]
},
```