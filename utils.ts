import { bgColor } from "./classes/bg-color";
import { borderColor } from "./classes/border-color";

export const includes: (val: string[] | string, search: string) => boolean = (val, search) => {
    if(typeOf(val) === "string") {
        return (val as string).match(search).size() > 0;
    } else {
        return (val as string[]).filter((v) => includes(v, search)).size() > 0;
    }
} 

export const getClass = (classes: string[], search: string) => {
    return classes.find((c) => {
        const split = c.split("-");
        split.pop();
        return split.join("-") === search;
    });
}

export const getBgColorClass = (classes: string[]) => {
    return classes.find((c) => {
        return bgColor[c as unknown as keyof typeof bgColor] !== undefined;
    });
}

export const getBorderColorClass = (classes: string[]) => {
    return classes.find((c) => {
        return borderColor[c as unknown as keyof typeof borderColor] !== undefined;
    });
}

export const formatClass = (className: string) => {
    const split = className.split(" ").filter((s) => s.size() > 0);
    return split.join(" ");
}