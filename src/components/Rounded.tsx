import Roact from "@rbxts/roact";
import { withHooks, useContext } from "@rbxts/roact-hooked";
import { ElementContext } from "../ElementContext";
import getClassValue from "../utils/getClassValue";

export default withHooks(() => {
    const {classList} = useContext(ElementContext)

    const roundedProps = {
        CornerRadius: getClassValue(classList, "rounded") as UDim || new UDim(0, 0),
    }
    return <uicorner {...roundedProps}/>
})