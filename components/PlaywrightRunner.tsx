"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import useStore from "@/store"

const PlaywrightRunner = () => {
  const { isExpanded } = useStore()
  return <div className="h-screen flex">
    <ResizablePanelGroup direction="horizontal">
      {!isExpanded && <>
        <ResizablePanel defaultSize={30} maxSize={30}>
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle />
      </>
      }
      <ResizablePanel defaultSize={70} minSize={70}>
        <RightPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
}

export default PlaywrightRunner
