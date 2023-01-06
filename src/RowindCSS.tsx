import Roact from "@rbxts/roact"
import { getClass, getBgColorClass, getBorderColorClass, formatClass } from "./utils"
import { h } from "./classes/h"
import { rounded } from "./classes/rounded"
import { w } from "./classes/w"
import { top } from "./classes/top"
import { left } from "./classes/left"
import { border } from "./classes/border"
import { p, pb, pt, pr, pl } from "./classes/p"
import { borderOpacity } from "./classes/border-opacity"
import { borderColor } from "./classes/border-color"
import { bgColor } from "./classes/bg-color"
import { gap } from "./classes/gap"
import { origin } from "./classes/origin"

interface Props extends Roact.PropsWithChildren {
    className?: string
}

export const Div = (props: Props) => {
    const classList = props.className ? formatClass(props.className).split(" ") : []
    const hasFlex = classList.includes("flex")
    const hasOverflow = classList.includes("overflow")
    const hasOverflowX = classList.includes("overflow-x")
    const hasOverflowY = classList.includes("overflow-y")
    const hasRounded = getClass(classList, "rounded") !== undefined
    const hasBorder = getClass(classList, "border") !== undefined
    const hasBgTransparent = classList.includes("bg-transparent")
    const hasP = getClass(classList, "p") !== undefined || getClass(classList, "py") !== undefined || getClass(classList, "px") !== undefined || getClass(classList, "pt") !== undefined || getClass(classList, "pr") !== undefined || getClass(classList, "pb") !== undefined || getClass(classList, "pl") !== undefined
    const wVal = w[getClass(classList, "w") as keyof typeof w || "w-20"]
    const hVal = h[getClass(classList, "h") as keyof typeof h || "h-20"]
    const topVal = top[getClass(classList, "top") as keyof typeof top || "top-0"]
    const leftVal = left[getClass(classList, "left") as keyof typeof left || "left-0"]
    const bgColorVal = bgColor[getBgColorClass(classList) as keyof typeof bgColor || "bg-white"]
    const originVal = origin[getClass(classList, "origin") as keyof typeof origin || "origin-left"]

    const div = {
        BorderSizePixel: 0,
        Size: new UDim2(wVal, hVal),
        Position: new UDim2(topVal, leftVal),
        Visible: true,
        AnchorPoint: originVal,
        BackgroundColor3: bgColorVal,
        BackgroundTransparency: hasBgTransparent ? 1 : 0,
    }

    const Border = () => {
        const borderVal = border[getClass(classList, "border") as keyof typeof border || "border"]

        const borderProps = {
            Thickness: borderVal,
            Transparency: borderOpacity[getClass(classList, "border-opacity") as keyof typeof borderOpacity || "border-opacity-0"],
            Color: borderColor[getBorderColorClass(classList) as keyof typeof borderColor || "border-white"]
        }
        return <uistroke {...borderProps} />
    }

    const Rounded = () => {
        const roundedProps = {
            CornerRadius: rounded[getClass(classList, "rounded") as keyof typeof rounded || "rounded"]
        }
        return <uicorner {...roundedProps}/>
    }

    const Padding = () => {
        const pVal = p[getClass(classList, "p") as keyof typeof p || "p-0"]
        const pbVal = pb[getClass(classList, "pb") as keyof typeof pb]
        const ptVal = pt[getClass(classList, "pt") as keyof typeof pt]
        const prVal = pr[getClass(classList, "pr") as keyof typeof pr]
        const plVal = pl[getClass(classList, "pl") as keyof typeof pl]

        const paddingProps = {
            PaddingBottom: pbVal || pVal,
            PaddingTop: ptVal || pVal,
            PaddingRight: prVal || pVal,
            PaddingLeft: plVal || pVal,
        }
        return <uipadding {...paddingProps}/>
    }

    const Flex = () => {
        const hasFlexCol = classList.includes("flex-col")
        const hasJustifyCenter = classList.includes("justify-center")
        const hasJustifyEnd = classList.includes("justify-end")
        const hasItemsCenter = classList.includes("items-center")
        const hasItemsEnd = classList.includes("items-end")

        const flex = {
            FillDirection: hasFlexCol ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal,
            Padding: gap[getClass(classList, "gap") as keyof typeof gap || "gap-0"],
            HorizontalAlignment: hasFlexCol 
            ? (hasItemsCenter ? Enum.HorizontalAlignment.Center : hasJustifyEnd ? Enum.HorizontalAlignment.Left : Enum.HorizontalAlignment.Right)
            : (hasJustifyCenter ? Enum.HorizontalAlignment.Center : hasJustifyEnd ? Enum.HorizontalAlignment.Right : Enum.HorizontalAlignment.Left),
            VerticalAlignment: hasFlexCol
            ? (hasJustifyCenter ? Enum.VerticalAlignment.Center : hasJustifyEnd ? Enum.VerticalAlignment.Bottom : Enum.VerticalAlignment.Top)
            : (hasItemsCenter ? Enum.VerticalAlignment.Center : hasItemsEnd ? Enum.VerticalAlignment.Bottom : Enum.VerticalAlignment.Top),
        }

        return <uilistlayout {...flex} />
    }
    return (
        <Roact.Fragment>
            {hasOverflow 
            ?
                <scrollingframe {...div}
                ScrollingDirection={hasOverflowX ? "X" : hasOverflowY ? "Y" : "XY"}>
                    {hasFlex && <Flex/>}
                    {hasRounded && <Rounded/>}
                    {hasP && <Padding/>}
                    {hasBorder && <Border/>}
                    {props[Roact.Children]}
                </scrollingframe>
            :    
                <frame {...div}>
                    {hasFlex && <Flex/>}
                    {hasRounded && <Rounded/>}
                    {hasP && <Padding/>}
                    {hasBorder && <Border/>}
                    {props[Roact.Children]}
                </frame>
            }
        </Roact.Fragment>
    )
}