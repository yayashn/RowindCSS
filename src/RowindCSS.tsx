import Roact from "@rbxts/roact"
import { formatClass } from "./utils"
import { P } from "./classes/p"
import useBreakpoints from "./hooks/useBreakpoints"
import { useEffect, withHooks } from "@rbxts/roact-hooked"
import { classes } from "./classes/classes"
import Object from "@rbxts/object-utils"

const player = game.GetService("Players").LocalPlayer || script.FindFirstAncestorWhichIsA("Player")!;

const init = () => {
    const screenGui = new Instance("ScreenGui")
    screenGui.Name = "RowindInit"
    screenGui.Parent = player.FindFirstChildWhichIsA("PlayerGui")!

    const screenWidth = new Instance("NumberValue")
    screenWidth.Name = "ScreenWidth"
    screenWidth.Parent = screenGui

    return screenGui
}

const rowindInit = (player.FindFirstChild("RowindInit") || init()) as ScreenGui;

export interface RowindProps extends Roact.PropsWithChildren {
    className?: string
    xsClassName?: string
    smClassName?: string
    mdClassName?: string
    lgClassName?: string
    xlClassName?: string
    Key?: string
    Text?: string
    tagName: "div" | "button" | "text",
    Event?: Roact.JsxInstanceEvents<TextButton> | undefined
}

type RowindClassType = keyof typeof classes;
type RowindSpecialClass = typeof specialClasses[number]
const specialClasses = ["flex", "bg-transparent", "overflow", "h-auto", "w-auto"]

export const breakpoints = {
    default: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
    "3xl": 1920,
}

export const Rowind = withHooks((props: RowindProps) => {
    const classList = props.className ? formatClass(props.className).split(" ") : []
    const activeBreakpoints = useBreakpoints(rowindInit)

    const getClass = (classList: string[], classType: RowindClassType) => {
        let breakpoint: Breakpoint = "" as unknown as Breakpoint;
 
        const c = classList.find((className) => {
            const prefix = Object.keys(breakpoints).find((bp) => className.match(`${bp}:`).size() > 0);
            if (prefix) {
                const split = className.split(":");
                className = split[1];
                breakpoint = split[0] as unknown as Breakpoint;
            }
            const classTypeNames = Object.keys(classes[classType]) as string[];
            return classTypeNames.some((name) => name === className);
        });
    
        return {
            className: c,
            classValue: ((classes[classType]) as unknown as Record<string, unknown>)[c as string],
            breakpoint
        }
    }

    const hasClass = (classType: RowindClassType) => {
        return getClass(classList, classType).className !== undefined
    }

    const useClassValue =  (classType: RowindClassType) => {
        for(const bp of activeBreakpoints) {
            const classListWithBp = classList
                .filter(c => c.match(`${bp}${bp !== "" ? ':' : ""}`).size() > 0)
            const classListWithBpFormatted = bp === "" ? classListWithBp : classListWithBp.map(c => c.split(":")[1])
            const c = getClass(classListWithBpFormatted, classType)
            if (c.className !== undefined) {
                return c.classValue
            }
        }
        return undefined;
    }

    const useSpecialClassValue = (classNames: RowindSpecialClass[]) => {
        const specialClasses = classList.filter(c => classNames.some(f => c === f))
        for(const bp of activeBreakpoints) {
            const specialClassesWithBp = specialClasses
                .filter(c => c.match(`${bp}${bp !== "" ? ':' : ""}`).size() > 0)
            const specialClassesWithBpFormatted = bp === "" ? specialClassesWithBp : specialClassesWithBp.map(c => c.split(":")[1])
            if (specialClassesWithBpFormatted.size() > 0) {
                return specialClassesWithBpFormatted[0]
            }
        }
    }

    const hasFlex = classList.includes("flex")
    const hasBgTransparent = classList.includes("bg-transparent")
    const hasOverflow = classList.includes("overflow")
    const hasHAuto = classList.includes("h-auto")
    const hasWAuto = classList.includes("w-auto")
    const hasP = (["p", "pt", "pb", "pr", "pl"] as P[]).some((p) => hasClass(p))
    const wVal = useClassValue("w") as UDim
    const hVal = useClassValue("h") as UDim
    const topVal = useClassValue("top") as UDim
    const leftVal = useClassValue("left") as UDim
    const rightVal = useClassValue("right") as UDim
    const bgColorVal = useClassValue("bgColor") as Color3
    const originVal = useClassValue("origin") as Vector2
    const leadingVal = useClassValue("leading") as number
    const fontWeightVal = useClassValue("fontWeight") as Enum.FontWeight || Enum.FontWeight.Regular
    const textSizeVal = useClassValue("text") as number

    let element = {
        BorderSizePixel: 0,
        Size: new UDim2(wVal, hVal),
        Position: new UDim2(
            (leftVal || rightVal) ||  0, 
            topVal
        ),
        Visible: true,
        AnchorPoint: originVal,
        BackgroundColor3: bgColorVal,
        BackgroundTransparency: (hasBgTransparent || !hasClass("bgColor")) ? 1 : 0,
        AutomaticSize: (hasWAuto && hasHAuto) ? Enum.AutomaticSize.XY : hasWAuto ? Enum.AutomaticSize.X : hasHAuto ? Enum.AutomaticSize.Y : Enum.AutomaticSize.None,
    }

    if(props.tagName === "text" || props.tagName === "button") {
        (element as unknown) = {...element,
            Text: props.Text || "",
            TextSize: textSizeVal,
            LineHeight: leadingVal,
            FontFace: new Font("Arial", props.tagName !== "button" ? fontWeightVal : fontWeightVal === Enum.FontWeight.Regular ? Enum.FontWeight.Regular : Enum.FontWeight.Bold),
            BorderSizePixel: useClassValue("border") as number || 0,
            BorderColor3: useClassValue("borderColor") as Color3 || new Color3(0, 0, 0),
        }
    }

    const Border = () => {
        const hasRounded = hasClass("rounded")

        const borderProps = {
            Thickness: useClassValue("border") as number || 0,
            Transparency: useClassValue("borderOpacity") as number || 0,
            Color: useClassValue("borderColor") as Color3 || new Color3(0, 0, 0),
            LineJoinMode: hasRounded ? Enum.LineJoinMode.Round : Enum.LineJoinMode.Miter,
        }
        return <uistroke {...borderProps} />
    }

    const Rounded = () => {
        const roundedProps = {
            CornerRadius: useClassValue("rounded") as UDim || new UDim(0, 0),
        }
        return <uicorner {...roundedProps}/>
    }

    const Padding = () => {
        const pVal = getClass(classList, "p").classValue as UDim
        const pbVal = getClass(classList, "pb").classValue as UDim
        const ptVal = getClass(classList, "pt").classValue as UDim
        const prVal = getClass(classList, "pr").classValue as UDim
        const plVal = getClass(classList, "pl").classValue as UDim

        const paddingProps = {
            PaddingBottom: pbVal || pVal,
            PaddingTop: ptVal || pVal,
            PaddingRight: prVal || pVal,
            PaddingLeft: plVal || pVal,
        }
        return <uipadding {...paddingProps}/>
    }

    const Flex = () => {
        const hasFlexCol = useSpecialClassValue(["flex-col", "flex-row"]) === "flex-col"
        const hasJustifyCenter = useSpecialClassValue(["justify-center", "justify-end", "justify-start"]) === "justify-center"
        const hasJustifyEnd = useSpecialClassValue(["justify-center", "justify-end", "justify-start"]) === "justify-end"
        const hasItemsCenter = useSpecialClassValue(["items-center", "items-end", "items-start"]) === "items-center"
        const hasItemsEnd = useSpecialClassValue(["items-center", "items-end", "items-start"]) === "items-end"

        const flex = {
            FillDirection: hasFlexCol ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal,
            Padding: useClassValue("gap") as UDim || new UDim(0, 0),
            HorizontalAlignment: hasFlexCol 
            ? (hasItemsCenter ? Enum.HorizontalAlignment.Center : hasJustifyEnd ? Enum.HorizontalAlignment.Left : Enum.HorizontalAlignment.Right)
            : (hasJustifyCenter ? Enum.HorizontalAlignment.Center : hasJustifyEnd ? Enum.HorizontalAlignment.Right : Enum.HorizontalAlignment.Left),
            VerticalAlignment: hasFlexCol
            ? (hasJustifyCenter ? Enum.VerticalAlignment.Center : hasJustifyEnd ? Enum.VerticalAlignment.Top : Enum.VerticalAlignment.Bottom)
            : (hasItemsCenter ? Enum.VerticalAlignment.Center : hasItemsEnd ? Enum.VerticalAlignment.Bottom : Enum.VerticalAlignment.Top),
        }

        return <uilistlayout {...flex} />
    }

    return (
        <Roact.Fragment>
            {props.tagName === "div" && <frame 
            Event={(props.Event as Roact.JsxInstanceEvents<Frame> | undefined) || {}}
            {...element}>
                {hasFlex && <Flex/>}
                {hasClass("rounded") && <Rounded/>}
                {hasP && <Padding/>}
                {hasClass("border") && <Border/>}
                {hasOverflow 
                    ? <scrollingframe ZIndex={-2} Size={new UDim2(1,0,1,0)}>
                        {props[Roact.Children]}
                    </scrollingframe>
                    : props[Roact.Children]
                }
            </frame>}

            {props.tagName === "button" && <textbutton 
            Event={props.Event || {}}
            AutoButtonColor={false} {...element}>
                {hasFlex && <Flex/>}
                {hasClass("rounded") && <Rounded/>}
                {hasP && <Padding/>}
                {hasOverflow 
                    ? <scrollingframe ZIndex={-2} Size={new UDim2(1,0,1,0)}>
                        {props[Roact.Children]}
                    </scrollingframe>
                    : props[Roact.Children]
                }
            </textbutton>}

            {props.tagName === "text" && <textlabel 
            Event={(props.Event as Roact.JsxInstanceEvents<TextLabel> | undefined) || {}}
            {...element}>
                {hasFlex && <Flex/>}
                {hasClass("rounded") && <Rounded/>}
                {hasP && <Padding/>}
                {hasOverflow 
                    ? <scrollingframe ZIndex={-2} Size={new UDim2(1,0,1,0)}>
                        {props[Roact.Children]}
                    </scrollingframe>
                    : props[Roact.Children]
                }
            </textlabel>}
        </Roact.Fragment>
    )
})