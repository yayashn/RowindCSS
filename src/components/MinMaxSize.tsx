import Roact from "@rbxts/roact";
import { useContext, withHooks } from "@rbxts/roact-hooked";
import { ElementContext } from "../ElementContext";
import getClassValue from "../utils/getClassValue";

export default withHooks(() => {
    const { classList } = useContext(ElementContext)

    const maxW = getClassValue(classList, "max-w", "max-w") as number
    const maxH = getClassValue(classList, "max-h", "max-h") as number
    const minW = getClassValue(classList, "min-w", "min-w") as number
    const minH = getClassValue(classList, "min-h", "min-h") as number

    if([minW, minH, maxW, maxH].every(v => (v as unknown as boolean) === false)) return <Roact.Fragment/>

    const props = {
        MaxSize: new Vector2(maxW || math.huge, maxH || math.huge),
        MinSize: new Vector2(minW || 0, minH || 0)
    }
    
    return <uisizeconstraint {...props}/>
})