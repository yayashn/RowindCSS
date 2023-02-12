import Roact from "@rbxts/roact";
import RowindElement from "./RowindElement";

interface RowindProps extends Roact.PropsWithChildren<{}> {
    className?: string
    Event?: Roact.JsxInstanceEvents<Frame> | undefined,
    ref?: Roact.Ref<Frame>
}

export default (props: RowindProps) => {
    return (
        <RowindElement ref={props.ref} Event={props.Event} tagName="div" className={props.className}>
            {props[Roact.Children]}
        </RowindElement>
    )
}