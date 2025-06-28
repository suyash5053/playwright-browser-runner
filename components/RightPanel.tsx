"use client"

import useStore from "@/store"
import { Button } from "./ui/button"
import { Maximize2, Minimize2 } from "lucide-react"
import EmbeddedBrowser from "./EmbeddedBrowser"

const RightPanel = () => {
  const { isExpanded, setIsExpanded, url } = useStore()
  return <div className="flex flex-col p-4 gap-4 h-full">
    <div className="flex gap-4 items-center">
      <div className="border rounded-md flex-1 items-center flex px-4 bg-zinc-100 h-10">{url}</div>
      <Button variant={"outline"} size={"icon"} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <Minimize2 /> :  <Maximize2 />}</Button>
    </div>
    <div className="flex-1 border rounded-md h-full">
      <EmbeddedBrowser />
    </div>
  </div>
}

export default RightPanel
