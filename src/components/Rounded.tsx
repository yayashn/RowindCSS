import Roact from "@rbxts/roact";
import { withHooks, useContext } from "@rbxts/roact-hooked";
import { ClassListContext } from "../ClassListContext";
import getClassValue from "../utils/getClassValue";

export default withHooks(() => {
    const classList = useContext(ClassListContext)
    const roundedProps = {
        CornerRadius: getClassValue(classList, "rounded") as UDim || new UDim(0, 0),
    }
    return <uicorner {...roundedProps}/>
})