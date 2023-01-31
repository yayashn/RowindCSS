import Roact from "@rbxts/roact"
import getClassValue from "../utils/getClassValue"
import { useContext, withHooks } from "@rbxts/roact-hooked"
import { ClassListContext } from "../ClassListContext"

export default withHooks(() => {
    const classList = useContext(ClassListContext)
    if(!getClassValue(classList, "flex")) return <Roact.Fragment/>

    const hasFlexCol = getClassValue(classList, "flex-col")
    const hasFlexRow = !hasFlexCol
    const hasJustifyCenter = getClassValue(classList, "justify-center")
    const hasJustifyEnd = getClassValue(classList, "justify-end")
    const hasItemsCenter = getClassValue(classList, "items-center")
    const hasItemsEnd = getClassValue(classList, "items-end")

    let flex: any = {
        FillDirection: hasFlexCol ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal,
        Padding: getClassValue(classList, "gap", "udim") as UDim || new UDim(0, 0),
       // SortOrder: Enum.SortOrder.LayoutOrder
    }

    if(hasFlexRow) {
        if(hasJustifyCenter) {
            flex.HorizontalAlignment = Enum.HorizontalAlignment.Center
        }
        if(hasJustifyEnd) {
            flex.HorizontalAlignment = Enum.HorizontalAlignment.Right
        }
        if(hasItemsCenter) {
            flex.VerticalAlignment = Enum.VerticalAlignment.Center
        }
        if(hasItemsEnd) {
            flex.VerticalAlignment = Enum.VerticalAlignment.Bottom
        }
    } else if(hasFlexCol) {
        if(hasJustifyCenter) {
            flex.VerticalAlignment = Enum.VerticalAlignment.Center
        }
        if(hasJustifyEnd) {
            flex.VerticalAlignment = Enum.VerticalAlignment.Bottom
        }
        if(hasItemsCenter) {
            flex.HorizontalAlignment = Enum.HorizontalAlignment.Center
        }
        if(hasItemsEnd) {
            flex.HorizontalAlignment = Enum.HorizontalAlignment.Right
        }
    }

    return <uilistlayout {...flex} />
})