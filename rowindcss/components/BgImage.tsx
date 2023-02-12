import Roact from "@rbxts/roact";
import { useContext, withHooks } from "@rbxts/roact-hooked";
import { ElementContext } from "../ElementContext";
import getClassValue from "../utils/getClassValue";

export default withHooks(() => {
    const { classList } = useContext(ElementContext)

    const value = getClassValue(classList, "bg", "string") as string
    if(!(value && typeOf(value) === "string" && value.match("^rbx").size() > 0)) return <Roact.Fragment/>

    const imageProps = {
        Size: new UDim2(1, 0, 1, 0),
        Image: getClassValue(classList, "bg", "string") as string || "",
        BackgroundTransparency: 1,
    }
    
    return <imagelabel {...imageProps}/>
})