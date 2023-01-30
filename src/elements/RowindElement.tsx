import Roact from "@rbxts/roact"
import getClassValue from "../utils/getClassValue"
import { ClassName } from "../types"

interface RowindProps extends Roact.PropsWithChildren<{}> {
    tagName: "div" | "button" | "text",
    className?: string
}

export default (props: RowindProps) => {
    const classList = (props.className ?? "").split(" ") as ClassName[];
    
    const hasH = getClassValue(classList, "h") !== undefined
    const hasW = getClassValue(classList, "w") !== undefined
    const hasWAuto = getClassValue(classList, "w") === "w-auto"
    const hasHAuto = getClassValue(classList, "h") === "h-auto"
    const hasOverflowHidden = getClassValue(classList, "overflow") === "overflow-hidden"
print(getClassValue(classList, "overflow"))
    const elementProps = {
        Size: new UDim2(getClassValue(classList, "w") as UDim || new UDim(0,40), 
                        getClassValue(classList, "h") as UDim || new UDim(0,40)),
        BackgroundColor3: getClassValue(classList, "bg") as Color3 || new Color3(1,1,1),
        Position: new UDim2(getClassValue(classList, "top") as UDim || new UDim(0,0),
                            getClassValue(classList, "left") as UDim || new UDim(0,0)),
        AnchorPoint: getClassValue(classList, "origin") as Vector2 || new Vector2(0,0),
        Visible: getClassValue(classList, "invisible") ? false : true,
        AutomaticSize: (((!hasH && !hasW) || (hasWAuto && hasHAuto)) && Enum.AutomaticSize.XY)
                     || ((!hasH || hasHAuto) && Enum.AutomaticSize.Y)
                     || ((!hasW || hasWAuto) && Enum.AutomaticSize.X)
                     || Enum.AutomaticSize.None,
        ZIndex: getClassValue(classList, "z") as number || 0,
        ClipsDescendants: hasOverflowHidden,
    }


    const Flex = () => {
        if(!getClassValue(classList, "flex")) return <Roact.Fragment/>

        const hasFlexCol = getClassValue(classList, "flex-col")
        const hasFlexRow = !hasFlexCol
        const hasJustifyCenter = getClassValue(classList, "justify-center")
        const hasJustifyEnd = getClassValue(classList, "justify-end")
        const hasItemsCenter = getClassValue(classList, "items-center")
        const hasItemsEnd = getClassValue(classList, "items-end")

        let flex: any = {
            FillDirection: hasFlexCol ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal,
            Padding: getClassValue(classList, "gap") as UDim || new UDim(0, 0),
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

    const Padding = () => {
        const pVal = getClassValue(classList, "p") as UDim
        const pbVal = getClassValue(classList, "pb") as UDim
        const ptVal = getClassValue(classList, "pt") as UDim
        const prVal = getClassValue(classList, "pr") as UDim
        const plVal = getClassValue(classList, "pl") as UDim
        const pxVal = getClassValue(classList, "px") as UDim
        const pyVal = getClassValue(classList, "py") as UDim

        if(!pVal && !pbVal && !ptVal && !prVal && !plVal && !pxVal && !pyVal) return <Roact.Fragment/>

        const paddingProps = {
            PaddingBottom: pbVal || pyVal || pVal,
            PaddingTop: ptVal || pyVal || pVal,
            PaddingRight: prVal || pxVal || pVal,
            PaddingLeft: plVal || pxVal || pVal,
        }

        return <uipadding {...paddingProps}/>
    }

    const Border = () => {

    }

    return (
        <Roact.Fragment>
            {props.tagName === "div" && 
                <frame {...elementProps}>
                    <Padding/>
                    <Flex/>
                    {props[Roact.Children]}
                </frame>
            }
            {props.tagName === "button" &&
                <textbutton {...elementProps}>
                    <Padding/>
                    <Flex/>
                    {props[Roact.Children]}
                </textbutton>
            }
            {props.tagName === "text" &&
                <textlabel {...elementProps}>
                    <Padding/>
                    <Flex/>
                    {props[Roact.Children]}
                </textlabel>
            }
        </Roact.Fragment>
    )
}