import Roact from "@rbxts/roact"
import { withHooks, useContext } from "@rbxts/roact-hooked"
import { ElementContext } from "../ElementContext"
import getClassValue from "../utils/getClassValue"

export default withHooks(() => {
    const {classList} = useContext(ElementContext)

    if(!getClassValue(classList, "border", "border")) return <Roact.Fragment/>

    const hasRounded = getClassValue(classList, "rounded") 
    && (getClassValue(classList, "rounded") !== new UDim(0, 0))

    const borderProps = {
        Thickness: getClassValue(classList, "border", "border") as number || 0,
        Transparency: getClassValue(classList, "border", "opacity") as number || 0,
        Color: getClassValue(classList, "border", "color3") as Color3 || new Color3(0, 0, 0),
        LineJoinMode: hasRounded ? Enum.LineJoinMode.Round : Enum.LineJoinMode.Miter,
    }

    return <uistroke {...borderProps} />
})