import Roact from "@rbxts/roact"
import { ClassList } from "../types"
import getClassValue from "./getClassValue"

interface RowindProps extends Roact.PropsWithChildren<{}> {
    tagName: "div" | "button" | "text" | "input",
    className?: string,
    Text?: string,
    Events?: Roact.JsxInstanceEvents<Frame> |
             Roact.JsxInstanceEvents<TextButton> |
             Roact.JsxInstanceEvents<TextLabel>
}

export default (classList: ClassList, props: RowindProps) => {
    const hasH = getClassValue(classList, "h", "udim") !== false
    const hasW = getClassValue(classList, "w", "udim") !== false
    const hasWAuto = getClassValue(classList, "w", "special") === "w-auto"
    const hasHAuto = getClassValue(classList, "h", "special") === "h-auto"
    const hasOverflowHidden = getClassValue(classList, "overflow") === "overflow-hidden"
    const hasBgColor = getClassValue(classList, "bg", "color3") !== false
    const hasBgOpacity = getClassValue(classList, "bg", "opacity") !== false

    let elementProps = {
        Size: new UDim2(getClassValue(classList, "w", "udim") as UDim || new UDim(0,40), 
                        getClassValue(classList, "h", "udim") as UDim || new UDim(0,40)),
        BackgroundColor3: getClassValue(classList, "bg", "color3") as Color3 || new Color3(0,0,0),
        BackgroundTransparency: hasBgOpacity ? getClassValue(classList, "bg", "opacity") as number : hasBgColor ? 0 : 1,
        Position: new UDim2(getClassValue(classList, "left") as UDim || new UDim(0,0),
                            getClassValue(classList, "top") as UDim || new UDim(0,0)),
        AnchorPoint: getClassValue(classList, "origin") as Vector2 || new Vector2(0,0),
        Visible: getClassValue(classList, "invisible") ? false : true,
        AutomaticSize: (((!hasH && !hasW) || (hasWAuto && hasHAuto)) && Enum.AutomaticSize.XY)
                     || ((!hasH || hasHAuto) && Enum.AutomaticSize.Y)
                     || ((!hasW || hasWAuto) && Enum.AutomaticSize.X)
                     || Enum.AutomaticSize.None,
        ZIndex: getClassValue(classList, "z", "z") as number || 0,
        ClipsDescendants: hasOverflowHidden,
        BorderSizePixel: 0,
    }

    const hasCapitalize = getClassValue(classList, "capitalize", "special") === "capitalize"
    const hasLowercase = getClassValue(classList, "lowercase", "special") === "lowercase"
    const hasUppercase = getClassValue(classList, "uppercase", "special") === "uppercase"
    const fontWeightVal = getClassValue(classList, "font", "font-weight") as Enum.FontWeight || Enum.FontWeight.Regular
    const hasTextCenter = getClassValue(classList, "text", "special") === "text-center"
    const hasTextRight = getClassValue(classList, "text", "special") === "text-right"

    if(props.tagName === "text" || props.tagName === "button" || props.tagName === "input") {
        (elementProps as unknown) = {...elementProps,
            BorderSizePixel: getClassValue(classList, "border", "border") as number || 0,
            BorderColor3: getClassValue(classList, "border", "color3") as Color3 || new Color3(0, 0, 0),
            TextSize: getClassValue(classList, "text", "text") as number || 14,
            LineHeight: getClassValue(classList, "leading", "leading") as number || 1,
            FontFace: new Font("Arial", props.tagName !== "button" ? fontWeightVal 
            : fontWeightVal === Enum.FontWeight.Regular ? Enum.FontWeight.Regular 
            : Enum.FontWeight.Bold),
            TextColor3: getClassValue(classList, "text", "color3") as Color3 || new Color3(0, 0, 0),
            Text: hasCapitalize ? props.Text!.split("").map((char, index) => index === 0 ? char.upper() : char).join("")
            : hasLowercase ? props.Text!.lower()
            : hasUppercase ? props.Text!.upper()
            : props.Text,
            Events: props.Events,
            TextScaled: getClassValue(classList, "text", "text") === false,
            TextXAlignment: hasTextCenter ? Enum.TextXAlignment.Center : hasTextRight ? Enum.TextXAlignment.Right : Enum.TextXAlignment.Left,
        }
    }

    if(props.tagName === "input") {
        (elementProps as unknown) = {...elementProps, 
           PlaceholderColor3: getClassValue(classList, "text", "color3") as Color3 || new Color3(0, 0, 0)
        }
    }

    return elementProps
}