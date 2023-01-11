export const formatClass = (className: string) => {
    const split = className.split(" ").filter((s) => s.size() > 0).sort();
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
        }
        else if(tonumber(arbitraryValue) !== undefined) {
            return tonumber(arbitraryValue)
        }
        else if(arbitraryValue.match("%%").size() > 0) {
            return new UDim(tonumber(arbitraryValue.split("%")[0])!/100, 0)
        }
        else if(arbitraryValue.match("px").size() > 0) {
            return new UDim(0, tonumber(arbitraryValue.split("px")[0]))
        } else {
            return false
        }
    } else {
        return false
    }
}

export function reverseArray(arr: unknown[]): unknown[] {
    function reverse(arr: unknown[], left: number, right: number): void {
      if (left >= right) return;
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      reverse(arr, left + 1, right - 1);
    }
  
    reverse(arr, 0, arr.size() - 1);
    return arr;
}