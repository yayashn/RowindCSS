# RowindCSS
TailwindCSS classes for Roact & Roblox-ts.

## Getting Started
Install using:
```bash
yarn add @rbxts/rowindcss
```
or
```bash
npm i @rbxts/rowindcss
```

Install Tailwind configs in your project root for autocomplete
```bash
npx tailwindcss init
```

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
    "./src/**/**/*.tsx",
    "./src/**/**/**/*.tsx"
],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Import the available Rowind components and start using them in Roact with Tailwind classes.
```tsx
    import { Div, Button, Text } from '@rbxts/rowindcss'

    export const Test = () => {
        return (
            <Div className="w-full md:w-96 h-48 p-10 border-4 overflow-y border-red-700 border-opacity-50 flex justify-center items-end gap-3 top-2/4 left-2/4 rounded-xl bg-blue-500">
                <Div className="w-10 h-10 rounded-sm"/>
                <Div className="w-10 h-10 rounded-lg bg-yellow-300"/>
                <Div className="w-10 h-10 bg-green-700"/>
                <Button Text="X" className="w-10 h-10 rounded-full bg-red-700"/>
                <Text Text="Y" className="w-10 h-10 rounded-full bg-purple-800"/>
            </Div>
        )
    }
```

Refer to the tailwind documentation for class names.
https://tailwindcss.com/

Currently supported Tailwind classes:
- Flex (align items, justify-content, gap, flex direction)
- Background (colour)
- Border (size, colour, transparency, radius)
- Font (weight)
- Positioning (Left, Top, Right, Bottom)
- Origin (anchor point)
- Padding
- Text (size, colour)
- Size (width, height)
- Visibility

## Server Side UI
If you are using server sided UI, run this command inside your directory 
that is responsible for Starter Player:
```bash
npx degit yayashn/RowindCSS/src/rowindconfig#main rowindconfig
```