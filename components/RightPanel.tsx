"use client"

import useUiStore from "@/store/useUiStore"
import EmbeddedBrowser from "./EmbeddedBrowser"
import useBrowserStore from "@/store/useBrowserStore"
import ExpandScreenButton from "./ExpandScreenButton"

const RightPanel = () => {
  const { isBrowserOpen } = useUiStore()
  const { url } = useBrowserStore()
  
  return (<div className="flex flex-col p-4 gap-4 h-full">
    <div className="flex gap-4 items-center">
      <div className="border rounded-md flex-1 items-center flex px-4 bg-zinc-100 h-10">{isBrowserOpen ? url : ""}</div>
      <ExpandScreenButton />
    </div>
    <div className="flex-1 border rounded-md h-full">
      <EmbeddedBrowser />
    </div>
  </div>)
}

export default RightPanel
