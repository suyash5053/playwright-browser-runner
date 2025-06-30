"use client"

import { Button } from "./ui/button"
import { Maximize2, Minimize2 } from "lucide-react"
import useUiStore from "@/store/useUiStore"

const ExpandScreenButton = () => {
    const { isExpanded, setIsExpanded } = useUiStore()
    return <Button variant={"outline"} size={"icon"} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <Minimize2 /> : <Maximize2 />}</Button>
}

export default ExpandScreenButton
