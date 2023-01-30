import Roact from "@rbxts/roact";
import RowindElement from "./RowindElement";

interface RowindProps extends Roact.PropsWithChildren<{}> {
    className?: string
}

export default ({className = ""}: RowindProps) => {
    return (
        <RowindElement tagName="text" className={className}/>
    )
}