import Roact, { Event, forwardRef } from "@rbxts/roact"
import { ClassList, ClassName } from "../types"
import { ElementContext } from "../ElementContext"
import Flex from "../components/Flex"
import Padding from "../components/Padding"
import Border from "../components/Border"
import Rounded from "../components/Rounded"
import getElementProps from "../utils/getElementProps"
import Overflow from "../components/Overflow"
import BgImage from "../components/BgImage"
import { useEffect, useRef, useState, withHooks, withHookDetection } from "@rbxts/roact-hooked"
import Aspect from "../components/Aspect"

interface RowindProps extends Roact.PropsWithChildren<{}> {
    tagName: "div" | "button" | "text",
    className?: string,
    Text?: string,
    Event?: Roact.JsxInstanceEvents<Frame> |
             Roact.JsxInstanceEvents<TextButton> |
             Roact.JsxInstanceEvents<TextLabel> | undefined,
    ref?: Roact.Ref<Frame | TextButton | TextLabel>
}

withHookDetection(Roact)

export default (props: RowindProps) => {
    const classList = (props.className ?? "").split(" ") as ClassName[]
    const [hovered, setHovered] = useState<Frame | TextButton | TextLabel | undefined>()
    const elementProps = getElementProps([...classList, ((hovered ? "+hovered" : "-hovered") as unknown as ClassName)], props)
    const elementRef = props.ref || useRef<Frame | TextButton | TextLabel>()

    useEffect(() => {
        if(!elementRef.getValue()) return
        if(!classList.some(className => className.match("^hover").size() > 0)) return

        const onHover = elementRef.getValue()!.MouseEnter.Connect(() => {
            setHovered(elementRef.getValue())
        })
        const onLeave = elementRef.getValue()!.MouseLeave.Connect(() => {
            setHovered(undefined)
        })
        
        return () => {
            onHover.Disconnect()
            onLeave.Disconnect()
        }
    }, [elementRef])

    return (
        <ElementContext.Provider value={{
            classList: [...classList, ((hovered ? "+hovered" : "-hovered") as unknown as ClassName)],
        }}>
            {props.tagName === "div" && 
                <frame Event={props.Event as Roact.JsxInstanceEvents<Frame> || {}}
                Ref={elementRef as Roact.Ref<Frame>}
                {...elementProps}>
                    <Overflow>
                        <Padding/>
                        <Flex/>
                        <Rounded/>
                        <Border/>         
                        <Aspect/>  
                        {props[Roact.Children]}             
                    </Overflow>
                    <BgImage/>
                </frame>
            }
            {props.tagName === "button" &&
                <textbutton Event={props.Event as Roact.JsxInstanceEvents<TextButton> || {}}
                Ref={elementRef as Roact.Ref<TextButton>}
                {...elementProps}>
                    <Overflow>
                        <Padding/>
                        <Flex/>
                        <Rounded/> 
                        <Aspect/>  
                        {props[Roact.Children]}                  
                    </Overflow>
                    <BgImage/>     
                </textbutton>
            }
            {props.tagName === "text" &&
                <textlabel Event={props.Event as Roact.JsxInstanceEvents<TextLabel> || {}}
                Ref={elementRef as Roact.Ref<TextLabel>}
                {...elementProps}>
                    <Overflow>
                        <Padding/>
                        <Flex/>
                        <Rounded/>  
                        <Aspect/>
                        {props[Roact.Children]}                   
                    </Overflow>
                    <BgImage/>
                </textlabel>
            }
        </ElementContext.Provider>
    )
}