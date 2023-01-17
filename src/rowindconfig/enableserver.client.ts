const player = game.GetService("Players").LocalPlayer;
const screenSize = player.WaitForChild("screenSize") as NumberValue;
const setScreenSize = screenSize.WaitForChild("setScreenSize") as RemoteEvent;

let serverGui = player.FindFirstChildOfClass("PlayerGui")!.WaitForChild("RowindInit") as ScreenGui;

serverGui.GetPropertyChangedSignal("AbsoluteSize").Connect(() => {
    setScreenSize.FireServer(serverGui!.AbsoluteSize.X);
})