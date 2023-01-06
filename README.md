# RowindCSS
TailwindCSS classes for Roact & Roblox-ts.

## Getting Started
Import the Div component and start using it in Roact with Tailwind classes.
```tsx
    import { Div } from 'rowindcss'

    export const Test = () => {
        return (
            <Div className="w-96 h-48 p-10 border-4 overflow-y border-red-700 border-opacity-50 flex justify-center items-end gap-3 top-2/4 left-2/4 rounded-xl bg-blue-500">
                <Div className="w-10 h-10 rounded-sm"/>
                <Div className="w-10 h-10 rounded-lg bg-yellow-300"/>
                <Div className="w-10 h-10 bg-green-700"/>
                <Div className="w-10 h-10 rounded-full bg-red-500"/>
            </Div>
        )
    }
```