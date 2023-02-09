import Roact from "@rbxts/roact";
import { withHooks, useContext } from "@rbxts/roact-hooked";
import { ElementContext } from "../ElementContext";
import getClassValue from "../utils/getClassValue";

export default withHooks(() => {
    const {classList} = useContext(ElementContext)

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
})