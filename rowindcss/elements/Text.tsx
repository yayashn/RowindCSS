import Roact from "@rbxts/roact";
import RowindElement from "./RowindElement";

interface RowindProps extends Roact.PropsWithChildren<{}> {
    className?: string,
    Text?: string,
    Event?: Roact.JsxInstanceEvents<TextLabel> | undefined,
    ref?: Roact.Ref<TextLabel>
}

export default ({className = "", Text = "", Event, ref}: RowindProps) => {
    return (
        <RowindElement ref={ref} Event={Event} tagName="text" Text={Text} className={className}/>
    )
}