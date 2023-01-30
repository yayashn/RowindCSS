import Roact from "@rbxts/roact";
import Div from "./elements/Div";

export = (target: Instance) => {
    let tree = Roact.mount((
        <Div className="w-40 h-40 bg-blue-500 top-2/4 left-2/4 origin-center flex items-center justify-center">
            <Div className="w-60 h-10 bg-red-500"/>
        </Div>
    ), 
    target, "UI")
    
    return () => {
        Roact.unmount(tree)
    }
}