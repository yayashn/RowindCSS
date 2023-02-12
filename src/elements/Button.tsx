import Roact from "@rbxts/roact";
import RowindElement from "./RowindElement";

interface RowindProps extends Roact.PropsWithChildren<{}> {
    className?: string
    Event?: Roact.JsxInstanceEvents<TextButton> | undefined,
    Text?: string,
    ref?: Roact.Ref<TextButton>
}

export default ({className = "", Event, Text = "", ref}: RowindProps) => {
    return (
        <RowindElement ref={ref} Event={Event} Text={Text}
        tagName="button" className={className}/>
    )
}