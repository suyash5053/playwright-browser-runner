"use client"

import useStore from "@/store"
import { Button } from "./ui/button"
import { Maximize2, Minimize2 } from "lucide-react"

const RightPanel = () => {
  const { isExpanded, setIsExpanded } = useStore()
  return <div className="flex flex-col p-4 gap-4">
    <div className="flex gap-4">
      <div className="border rounded-md flex-1"></div>
      <Button variant={"outline"} size={"icon"} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <Maximize2 /> : <Minimize2 />}</Button>
    </div>
  </div>
}

export default RightPanel
