import Roact from "@rbxts/roact";
import { useContext, withHooks } from "@rbxts/roact-hooked";
import { ElementContext } from "../ElementContext";
import getClassValue from "../utils/getClassValue";

export default withHooks(() => {
    const { classList } = useContext(ElementContext)

    if(!getClassValue(classList, "scale", "scale")) return <Roact.Fragment/>

    const props = {
        Scale: getClassValue(classList, "scale", "scale") as number || 1
    }
    
    return <uiscale {...props}/>
})