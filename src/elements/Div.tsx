import Roact from "@rbxts/roact"
import { Rowind } from "../RowindCSS"

interface Props extends Roact.PropsWithChildren {
    className?: string
    Text?: string,
    Event?: Roact.JsxInstanceEvents<TextButton> | undefined
}

export default (props: Props) => {
    return (
        <Rowind tagName="div" Event={props.Event} Text={props.Text} className={props.className}>
            {props[Roact.Children]}
        </Rowind>
    )
}