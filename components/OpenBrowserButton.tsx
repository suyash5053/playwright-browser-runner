"use client"

import useStore from "@/store/useUiStore"
import { Button } from "./ui/button"
import { Globe, Loader } from "lucide-react"
import useBrowserStore from "@/store/useBrowserStore"

const OpenBrowserButton = ({ handleClick }: { handleClick: () => void }) => {
  const { isBrowserOpen, isReady } = useStore()
  const { isLoading, } = useBrowserStore()
  return (
    <Button onClick={handleClick} variant="outline" className="gap-2 h-10 disabled:{isLoading || !isReady}" disabled={isLoading || !isReady}>
      {isLoading ? <Loader className="animate-spin" /> : isBrowserOpen ? "Close Browser" : "Open Browser"}
    </Button>
  )
}

export default OpenBrowserButton
