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

export default (player: Player = game.GetService("Players").LocalPlayer) => {
    const [breakpoint, setBreakpoint] = useState<Breakpoint[]>([""]);
    const screenSize = player.WaitForChild("screenSize") as NumberValue

    useEffect(() => {
        const updateBreakpoints = () => {
            const bps = Object.entries(breakpoints);
            const absoluteSize = screenSize!.Value
            const newBreakpoints = bps.filter(([_, size]) => size <= absoluteSize).map(([bp]) => bp as Breakpoint);
            setBreakpoint(reverse(newBreakpoints));
        }

        updateBreakpoints()
        screenSize!.Changed.Connect(updateBreakpoints)
    }, [])

    return breakpoint
}