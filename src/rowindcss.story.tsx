import Roact from "@rbxts/roact";
import Div from "./elements/Div";
import Text from "./elements/Text";
import Button from "./elements/Button";
import { useEffect, useRef, withHookDetection } from "@rbxts/roact-hooked";

withHookDetection(Roact)

export = (target: Instance) => {    
    let tree = Roact.mount((
        <Component />
    ),
    target, "UI")

    return () => {
        Roact.unmount(tree)
    }
}

const Component = () => {
    const ref = useRef<TextButton>()

    useEffect(() => {
        if(ref.getValue()) {
            ref.getValue()!.MouseEnter.Connect(() => {
                print("hovered")
            })
        }
    }, [ref])

    return (
        <Div className="w-[500px] h-[50%] rounded-lg border-8 border-opacity-60 border-white bg-white 
        top-2/4 left-2/4 origin-center flex flex-col hover:flex-row p-5 items-center gap-4">
            <Text Text="test" className="w-full font-bold uppercase text-[25px] bg-slate-500 text-white hover:text-yellow-300"/>
            <Div className="w-full h-5/6 flex items-center justify-center gap-5">
                {[1,2,3,4,5].map((_, i) => {
                    return (
                        <Button ref={ref}
                        Event={{
                            MouseButton1Click: () => {
                                print("clicked")
                            },
                        }}
                        className="h-[50px] aspect-[1/1] bg-slate-500 hover:bg-purple-500 hover:rounded-xl hover:w-40" Key={i} />
                    )
                })}
            </Div>
        </Div>
    )
}