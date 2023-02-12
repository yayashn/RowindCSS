import { createContext } from "@rbxts/roact";
import { ClassList } from "./types";

export const ElementContext = createContext<{
    classList: ClassList | [];
}>({ classList: []});