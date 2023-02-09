import Roact from "@rbxts/roact";
import { useContext, withHooks } from "@rbxts/roact-hooked";
import { ElementContext } from "../ElementContext";
import getClassValue from "../utils/getClassValue";

export default withHooks(() => {
    const { classList } = useContext(ElementContext)

    if(!getClassValue(classList, "aspect", "aspect")) return <Roact.Fragment/>

    const imageProps = {
        AspectRatio: getClassValue(classList, "aspect", "aspect") as number
    }
    
    return <uiaspectratioconstraint {...imageProps}/>
})