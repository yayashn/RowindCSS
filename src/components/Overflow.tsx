import Roact from "@rbxts/roact";
import { useContext, withHooks } from "@rbxts/roact-hooked";
import getClassValue from "../utils/getClassValue";
import { ElementContext } from "../ElementContext";

interface Props extends Roact.PropsWithChildren<{}> {

}

export default withHooks((props: Props) => {
    const {classList} = useContext(ElementContext)
    const hasOverflow = getClassValue(classList, "overflow") === "overflow"
    const hasOverflowX = getClassValue(classList, "overflow") === "overflow-x"
    const hasOverflowY = getClassValue(classList, "overflow") === "overflow-y"

    const overflowProps = {
        ScrollBarThickness: 0,
        ScrollBarImageColor3: new Color3(0, 0, 0),
        Size: new UDim2(1, 0, 1, 0),
        BackgroundTransparency: 1,
        ScrollingDirection: hasOverflowY ? Enum.ScrollingDirection.Y : hasOverflowX ? Enum.ScrollingDirection.X : Enum.ScrollingDirection.XY,
    }

    return (
        <Roact.Fragment>
            {
                (hasOverflow || hasOverflowX || hasOverflowY)
            ?   <scrollingframe {...overflowProps}>
                    {props[Roact.Children]}
                </scrollingframe>
            :   <Roact.Fragment>
                    {props[Roact.Children]}
                </Roact.Fragment>
            }
        </Roact.Fragment>
    )
})