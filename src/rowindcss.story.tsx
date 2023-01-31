import Roact from "@rbxts/roact";
import Div from "./elements/Div";
import Text from "./elements/Text";

export = (target: Instance) => {
    let tree = Roact.mount((
        <Div className="w-[400px] h-[50%] rounded-lg border-8 border-opacity-60 border-red-500 bg-blue-500 
        top-2/4 left-2/4 origin-center flex flex-col p-5 items-center gap-4">
            <Text Text="test" className="w-full capitalize font-bold bg-green-500 text-white text-5xl"/>
            <Div className="w-60 h-10 bg-red-500"/>
        </Div>
    ),
    target, "UI")
    
    return () => {
        Roact.unmount(tree)
    }
}