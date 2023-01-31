import Roact from "@rbxts/roact"
import { ClassName } from "../types"
import { ClassListContext } from "../ClassListContext"
import Flex from "../components/Flex"
import Padding from "../components/Padding"
import Border from "../components/Border"
import Rounded from "../components/Rounded"
import getElementProps from "../utils/getElementProps"

interface RowindProps extends Roact.PropsWithChildren<{}> {
    tagName: "div" | "button" | "text",
    className?: string
}

export default (props: RowindProps) => {
    const classList = (props.className ?? "").split(" ") as ClassName[];
    const elementProps = getElementProps(classList, props.tagName)

    return (
        <ClassListContext.Provider value={classList}>
            {props.tagName === "div" && 
                <frame {...elementProps}>
                    <Padding/>
                    <Flex/>
                    <Rounded/>
                    <Border/>
                    {props[Roact.Children]}
                </frame>
            }
            {props.tagName === "button" &&
                <textbutton {...elementProps}>
                    <Padding/>
                    <Flex/>
                    <Rounded/>
                    {props[Roact.Children]}
                </textbutton>
            }
            {props.tagName === "text" &&
                <textlabel {...elementProps}>
                    <Padding/>
                    <Flex/>
                    <Rounded/>
                    {props[Roact.Children]}
                </textlabel>
            }
        </ClassListContext.Provider>
    )
}