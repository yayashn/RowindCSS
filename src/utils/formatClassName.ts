import { ClassName } from "../types";

export default (className: string) => {
    const split = className.split(" ").filter((s) => s.size() > 0).sort();
    return split.join(" ") as unknown as ClassName[];
}