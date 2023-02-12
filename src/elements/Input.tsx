import Roact from "@rbxts/roact";
import RowindElement from "./RowindElement";

interface RowindProps extends Roact.PropsWithChildren<{}> {
    className?: string,
    Text?: string,
    Event?: Roact.JsxInstanceEvents<TextBox> | undefined,
    ref?: Roact.Ref<TextBox>,
    placeholder?: string
}

export default ({className = "", Text = "", Event, ref, placeholder=""}: RowindProps) => {
    return (
        <RowindElement placeholder={placeholder} ref={ref} Event={Event} tagName="input" Text={Text} className={className}/>
    )
}