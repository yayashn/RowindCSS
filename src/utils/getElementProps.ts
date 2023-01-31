import { ClassList } from "../types"
import getClassValue from "./getClassValue"

export default (classList: ClassList, tagName: "div" | "button" | "text") => {
    const hasH = getClassValue(classList, "h", "udim") !== undefined
    const hasW = getClassValue(classList, "w", "udim") !== undefined
    const hasWAuto = getClassValue(classList, "w", "special") === "w-auto"
    const hasHAuto = getClassValue(classList, "h", "special") === "h-auto"
    const hasOverflowHidden = getClassValue(classList, "overflow") === "overflow-hidden"

    let elementProps = {
        Size: new UDim2(getClassValue(classList, "w", "udim") as UDim || new UDim(0,40), 
                        getClassValue(classList, "h", "udim") as UDim || new UDim(0,40)),
        BackgroundColor3: getClassValue(classList, "bg") as Color3 || new Color3(1,1,1),
        Position: new UDim2(getClassValue(classList, "top") as UDim || new UDim(0,0),
                            getClassValue(classList, "left") as UDim || new UDim(0,0)),
        AnchorPoint: getClassValue(classList, "origin") as Vector2 || new Vector2(0,0),
        Visible: getClassValue(classList, "invisible") ? false : true,
        AutomaticSize: (((!hasH && !hasW) || (hasWAuto && hasHAuto)) && Enum.AutomaticSize.XY)
                     || ((!hasH || hasHAuto) && Enum.AutomaticSize.Y)
                     || ((!hasW || hasWAuto) && Enum.AutomaticSize.X)
                     || Enum.AutomaticSize.None,
        ZIndex: getClassValue(classList, "z", "z") as number || 0,
        ClipsDescendants: hasOverflowHidden,
    }

    if(tagName === "text" || tagName === "button") {
        (elementProps as unknown) = {...elementProps,
            BorderSizePixel: getClassValue(classList, "border", "border") as number || 0,
            BorderColor3: getClassValue(classList, "border", "color3") as Color3 || new Color3(0, 0, 0),
        }
    }

    return elementProps
}