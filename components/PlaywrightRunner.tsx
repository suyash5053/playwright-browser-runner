"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import useStore from "@/store/useUiStore"

const PlaywrightRunner = () => {
  const { isExpanded } = useStore()
  return <div className="h-screen flex">
    <ResizablePanelGroup direction="horizontal">
      {!isExpanded && <>
        <ResizablePanel defaultSize={40} maxSize={40}>
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle />
      </>
      }
      <ResizablePanel defaultSize={60} minSize={60}>
        <RightPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
}

export default PlaywrightRunner
