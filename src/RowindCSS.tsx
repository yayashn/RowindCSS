import Roact from "@rbxts/roact"
import { formatClass, getArbitraryValue } from "./utils"
import { P } from "./classes/p"
import useBreakpoints from "./hooks/useBreakpoints"
import { withHooks } from "@rbxts/roact-hooked"
import { classes } from "./classes/classes"
import Object from "@rbxts/object-utils"

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

const player = script.FindFirstAncestorWhichIsA("Player")!;

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
        let value: unknown = undefined;

        // Normal Value Checker
        let c = classList.find((className) => {
            const prefix = Object.keys(breakpoints).find((bp) => className.match(`${bp}:`).size() > 0);
            if (prefix) {
                const split = className.split(":");
                className = split[1];
                breakpoint = split[0] as unknown as Breakpoint;
            }
        
            const classTypeNames = Object.keys(classes[classType]) as string[];
            return classTypeNames.some((name) => name === className);
        });

        // Arbitrary Value Checker
        if(c === undefined) {
            c = classList.find((className) => {
                const prefix = Object.keys(breakpoints).find((bp) => className.match(`${bp}:`).size() > 0);
                if (prefix) {
                    const split = className.split(":");
                    className = split[1];
                    breakpoint = split[0] as unknown as Breakpoint;
                }

                let abitraryClasses = ({
                    textColor: () => {
                        const c = classList.find(cn => 
                            ["#", "rgb", "hsl"].some(e => cn.match(`${'^text%-%['}${e}`).size() > 0)
                        )
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    bgColor: () => {
                        const c = classList.find(cn => 
                            ["#", "rgb", "hsl"].some(e => cn.match(`${'^bg%-%['}${e}`).size() > 0)
                        )
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    borderColor: () => {
                        const c = classList.find(cn => 
                            ["#", "rgb", "hsl"].some(e => cn.match(`${'^border%-%['}${e}`).size() > 0)
                        )
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    borderOpacity: () => {
                        const c = classList.find(cn => {
                            return cn.match("^border-opacity%-%[").size() > 0
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    border: () => {
                        const c = classList.find(cn => {
                            return cn.match("^border%-%[").size() > 0 && !["#", "rgb", "hsl"].some(e => cn.match(`${'^border%-%['}${e}`).size() > 0)
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    gap: () => {
                        const c = classList.find(cn => {
                            return cn.match("^gap%-%[").size() > 0
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    h: () => {
                        const c = classList.find(cn => {
                            return cn.match("^h%-%[").size() > 0
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    leading: () => {
                        const c = classList.find(cn => {
                            return cn.match("^leading%-%[").size() > 0
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    left: () => {
                        const c = classList.find(cn => {
                            return cn.match("^left%-%[").size() > 0
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    p: () => {
                        const c = classList.find(cn => {
                            return cn.match("^p%-%[").size() > 0
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    right: () => {
                        const c = classList.find(cn => {
                            return cn.match("^right%-%[").size() > 0
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    rounded: () => {
                        const c = classList.find(cn => {
                            return cn.match("^rounded%-%[").size() > 0
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    text: () => {
                        const c = classList.find(cn => {
                            return cn.match("^text%-%[").size() > 0 && !["#", "rgb", "hsl"].some(e => cn.match(`${'^text%-%['}${e}`).size() > 0)
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    top: () => {
                        const c = classList.find(cn => {
                            return cn.match("^top%-%[").size() > 0
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    w: () => {
                        const c = classList.find(cn => {
                            return cn.match("^w%-%[").size() > 0
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                    z: () => {
                        const c = classList.find(cn => {
                            return cn.match("^z%-%[").size() > 0
                        })
                        if(c) {
                            value = getArbitraryValue(c);
                            return true
                        }
                    },
                } as Record<RowindClassType, () => boolean>);

                return abitraryClasses[classType] && abitraryClasses[classType]();
            })
        }

        return {
            className: c,
            classValue: value || ((classes[classType]) as unknown as Record<string, unknown>)[c as string],
            breakpoint
        }
    }

    const hasClass = (classType: RowindClassType) => {
        return getClass(classList, classType).className !== undefined
    }

    const useClassValue = (classType: RowindClassType) => {
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
        const specialClasses = classList.filter(c => classNames.some(f => {
            if(c.match(":").size() > 0) {
                const className = c.split(":")[1]
                return className === f
            } else {
                return c === f
            }
        }))
        for(const bp of activeBreakpoints) {
            const specialClassesWithBp = specialClasses
                .filter(c => c.match(`${bp}${bp !== "" ? ':' : ""}`).size() > 0)
            const specialClassesWithBpFormatted = bp === "" ? specialClassesWithBp : specialClassesWithBp.map(c => c.split(":")[1])
            if (specialClassesWithBpFormatted.size() > 0) {
                return specialClassesWithBpFormatted[0]
            }
        }
        return undefined
    }

    const hasFlex = useSpecialClassValue(["flex"]) === "flex"
    const hasBgTransparent = useSpecialClassValue(["bg-transparent"]) === "bg-transparent"
    const hasOverflow = useSpecialClassValue(["overflow", "overflow-hidden"]) === "overflow"
    const hasOverflowHidden = useSpecialClassValue(["overflow", "overflow-hidden"]) === "overflow-hidden"
    const hasHAuto = useSpecialClassValue(["h-auto"]) === "h-auto"
    const hasWAuto = useSpecialClassValue(["w-auto"]) === "w-auto"
    const hasHidden = ["hidden", "invisible"].some(s => useSpecialClassValue(["hidden", "visible", "invisible"]) === s)
    const hasH = hasClass("h")
    const hasW = hasClass("w")
    const hasP = (["p", "pt", "pb", "pr", "pl", "px", "py"] as P[]).some((p) => hasClass(p))
    const wVal = useClassValue("w") as UDim
    const hVal = useClassValue("h") as UDim
    const topVal = useClassValue("top") as UDim
    const leftVal = useClassValue("left") as UDim
    const rightVal = useClassValue("right") as UDim
    const bgColorVal = useClassValue("bgColor") as Color3
    const originVal = useClassValue("origin") as Vector2
    const leadingVal = useClassValue("leading") as number
    const fontWeightVal = useClassValue("fontWeight") as Enum.FontWeight || Enum.FontWeight.Regular
    const textSizeVal = useClassValue("text") as number;

    let element = {
        BorderSizePixel: 0,
        Size: new UDim2(wVal, hVal),
        Position: new UDim2(
            (leftVal || rightVal) ||  0, 
            topVal
        ),
        Visible: !hasHidden,
        AnchorPoint: originVal,
        BackgroundColor3: bgColorVal,
        BackgroundTransparency: (hasBgTransparent || !hasClass("bgColor")) ? 1 : 0,
        AutomaticSize: (((!hasH && !hasW) || (hasWAuto && hasHAuto)) && Enum.AutomaticSize.XY)
                     || ((!hasH || hasHAuto) && Enum.AutomaticSize.Y)
                     || ((!hasW || hasWAuto) && Enum.AutomaticSize.X)
                     || Enum.AutomaticSize.None,
        ZIndex: useClassValue("z") as number || 0,
        ClipsDescendants: hasOverflowHidden,
    }

    if(props.tagName === "text" || props.tagName === "button") {
        (element as unknown) = {...element,
            Text: props.Text || "",
            TextSize: textSizeVal,
            LineHeight: leadingVal,
            FontFace: new Font("Arial", props.tagName !== "button" ? fontWeightVal : fontWeightVal === Enum.FontWeight.Regular ? Enum.FontWeight.Regular : Enum.FontWeight.Bold),
            BorderSizePixel: useClassValue("border") as number || 0,
            BorderColor3: useClassValue("borderColor") as Color3 || new Color3(0, 0, 0),
            TextColor3: useClassValue("textColor") as Color3 || new Color3(0, 0, 0)
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
        const pVal = useClassValue("p") as UDim
        const pbVal = useClassValue("pb") as UDim
        const ptVal = useClassValue("pt") as UDim
        const prVal = useClassValue("pr") as UDim
        const plVal = useClassValue("pl") as UDim
        const pxVal = useClassValue("px") as UDim
        const pyVal = useClassValue("py") as UDim

        const paddingProps = {
            PaddingBottom: pbVal || pyVal || pVal,
            PaddingTop: ptVal || pyVal || pVal,
            PaddingRight: prVal || pxVal || pVal,
            PaddingLeft: plVal || pxVal || pVal,
        }
        return <uipadding {...paddingProps}/>
    }

    const Flex = () => {
        const hasFlexCol = useSpecialClassValue(["flex-col", "flex-row"]) === "flex-col"
        const hasFlexRow = !hasFlexCol
        const hasJustifyCenter = useSpecialClassValue(["justify-center", "justify-end", "justify-start"]) === "justify-center"
        const hasJustifyEnd = useSpecialClassValue(["justify-center", "justify-end", "justify-start"]) === "justify-end"
        const hasItemsCenter = useSpecialClassValue(["items-center", "items-end", "items-start"]) === "items-center"
        const hasItemsEnd = useSpecialClassValue(["items-center", "items-end", "items-start"]) === "items-end"

        let flex: any = {
            FillDirection: hasFlexCol ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal,
            Padding: useClassValue("gap") as UDim || new UDim(0, 0),
           // SortOrder: Enum.SortOrder.LayoutOrder
        }

        if(hasFlexRow) {
            if(hasJustifyCenter) {
                flex.HorizontalAlignment = Enum.HorizontalAlignment.Center
            }
            if(hasJustifyEnd) {
                flex.HorizontalAlignment = Enum.HorizontalAlignment.Right
            }
            if(hasItemsCenter) {
                flex.VerticalAlignment = Enum.VerticalAlignment.Center
            }
            if(hasItemsEnd) {
                flex.VerticalAlignment = Enum.VerticalAlignment.Bottom
            }
        } else if(hasFlexCol) {
            if(hasJustifyCenter) {
                flex.VerticalAlignment = Enum.VerticalAlignment.Center
            }
            if(hasJustifyEnd) {
                flex.VerticalAlignment = Enum.VerticalAlignment.Bottom
            }
            if(hasItemsCenter) {
                flex.HorizontalAlignment = Enum.HorizontalAlignment.Center
            }
            if(hasItemsEnd) {
                flex.HorizontalAlignment = Enum.HorizontalAlignment.Right
            }
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
                    ? <scrollingframe ZIndex={-2}>
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
                    ? <scrollingframe ZIndex={-2}>
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
                    ? <scrollingframe ZIndex={-2}>
                        {props[Roact.Children]}
                    </scrollingframe>
                    : props[Roact.Children]
                }
            </textlabel>}
        </Roact.Fragment>
    )
})