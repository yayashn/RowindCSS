export const formatClass = (className: string) => {
    const split = className.split(" ").filter((s) => s.size() > 0);
    return split.join(" ");
}

export const getArbitraryValue = (className: string) => {
    if(!className.find("%[")) {
        return false
    }
    const left = className.split("[")[1]
    const arbitraryValue = left?.split("]")[0]
    
    if(arbitraryValue) {
        if(arbitraryValue.find("#").size() > 0) {
            return Color3.fromHex(arbitraryValue)
        } else if(arbitraryValue.find("rgb").size() > 0) {
            const left = arbitraryValue.split("(")[1]
            const right = left.split(")")[0]
            const [r, g, b] = right.split(",")
            return Color3.fromRGB(tonumber(r), tonumber(g), tonumber(b))
        } else if(arbitraryValue.find("hsl").size() > 0) {
            const left = arbitraryValue.split("(")[1]
            const right = left.split(")")[0]
            const [h, s, l] = right.split(",")
            return Color3.fromRGB(tonumber(h), tonumber(s), tonumber(l))
        } else {
            return false
        }
    } else {
        return false
    }
}