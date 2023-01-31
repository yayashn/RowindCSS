import Roact from "@rbxts/roact";
import RowindElement from "./RowindElement";

interface RowindProps extends Roact.PropsWithChildren<{}> {
    className?: string,
    Text?: string,
}

export default ({className = "", Text = ""}: RowindProps) => {
    return (
        <RowindElement tagName="text" Text={Text} className={className}/>
    )
}