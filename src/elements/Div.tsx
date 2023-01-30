import Roact from "@rbxts/roact";
import RowindElement from "./RowindElement";

interface RowindProps extends Roact.PropsWithChildren<{}> {
    className?: string
}

export default (props: RowindProps) => {
    return (
        <RowindElement tagName="div" className={props.className}>
            {props[Roact.Children]}
        </RowindElement>
    )
}