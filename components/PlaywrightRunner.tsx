import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"

const PlaywrightRunner = () => {
  return <div className="h-screen flex">
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} maxSize={30}>Left Panel</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70} minSize={70}>
        Right Panel
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
}

export default PlaywrightRunner
