"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import useUiStore from "@/store/useUiStore"
import { findContainersUsingPorts } from "@/helpers"
import { useEffect } from "react"
import { cdpPort, vncPort } from "@/helpers/config"
import useBrowserStore from "@/store/useBrowserStore"

const PlaywrightRunner = () => {
  const { isExpanded, setIsReady } = useUiStore()
  const { addCommandToHistory } = useBrowserStore()

  useEffect(() => {
    findContainersUsingPorts([cdpPort, vncPort]).then((containers) => {
      if (containers.length > 0) {
        setIsReady(false)
        addCommandToHistory("Ports are already open close them to continue", false)
      }
    })
  }, [])

  return (<div className="h-screen flex">
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
  </div>)
}

export default PlaywrightRunner
