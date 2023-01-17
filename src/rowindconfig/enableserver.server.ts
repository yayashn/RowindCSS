const player = script.FindFirstAncestorWhichIsA("Player")!;

let screenSize: NumberValue;
if (player.FindFirstChild("screenSize")) {
    screenSize = player.FindFirstChild("screenSize") as NumberValue;
} else {
    screenSize = new Instance("NumberValue");
    screenSize.Name = "screenSize";
    screenSize.Parent = player;
}
const setScreenSize = new Instance("RemoteEvent");
setScreenSize.Name = "setScreenSize";
setScreenSize.Parent = screenSize;
setScreenSize.OnServerEvent.Connect((player, newSize) => {
    screenSize.Value = newSize as number;
})