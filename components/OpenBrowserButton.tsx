"use client"

import useStore from "@/store"
import { Button } from "./ui/button"
import { Globe } from "lucide-react"


const OpenBrowserButton = ({ handleClick }: { handleClick: () => void }) => {
  const { isBrowserOpen } = useStore()
  return (
    <Button onClick={handleClick} variant="outline" className="gap-2 w-38 h-10"><Globe />{isBrowserOpen ? "Close" : "Open"} Browser</Button>
  )
}

export default OpenBrowserButton
