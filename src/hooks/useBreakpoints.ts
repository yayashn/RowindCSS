import Object from "@rbxts/object-utils";
import { useEffect, useState } from "@rbxts/roact-hooked"

export const breakpoints = {
    "": 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
    "3xl": 1920,
}

export type Breakpoint = keyof typeof breakpoints

const reverse = <T>(array: T[]) => {
    const newArray = [...array]
    for (let i = 0; i < newArray.size() / 2; i++) {
        const temp = newArray[i]
        newArray[i] = newArray[newArray.size() - 1 - i]
        newArray[newArray.size() - 1 - i] = temp
    }
    return newArray
}

export default (screenGui: ScreenGui) => {
    const [breakpoint, setBreakpoint] = useState<Breakpoint[]>([""]);
    const player = screenGui.FindFirstAncestorWhichIsA("Player")!;
    const isServer = game.GetService("Players").LocalPlayer === undefined;
    const screenSize = isServer ? player.WaitForChild("screenSize") as NumberValue : undefined;

    useEffect(() => {
        const updateBreakpoints = () => {
            const bps = Object.entries(breakpoints);
            const absoluteSize = isServer ? screenSize!.Value : screenGui.AbsoluteSize.X
            const newBreakpoints = bps.filter(([_, size]) => size <= absoluteSize).map(([bp]) => bp as Breakpoint);
            setBreakpoint(reverse(newBreakpoints));
        }

        updateBreakpoints()
        if (isServer) {
            screenSize!.Changed.Connect(updateBreakpoints)
        } else {
            screenGui.GetPropertyChangedSignal("AbsoluteSize").Connect(updateBreakpoints)
        }
    }, [])

    return breakpoint
}