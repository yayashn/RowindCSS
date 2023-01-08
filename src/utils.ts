export const formatClass = (className: string) => {
    const split = className.split(" ").filter((s) => s.size() > 0);
    return split.join(" ");
}