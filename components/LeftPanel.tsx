"use client"

import { Input } from "./ui/input"
import OpenBrowserButton from "./OpenBrowserButton"
import useStore from "@/store"
import { CommandHistory } from "./CommandHistory"
import CommandInput from "./CommandInput"
import { useState } from "react"


const LeftPanel = () => {
  const [tempUrl, setTempUrl] = useState<string | null>(null);
  const { isBrowserOpen, setIsBrowserOpen, setUrl } = useStore()
  const handleButtonClick = () => {
    isBrowserOpen ? setUrl(null) : setUrl(tempUrl)
    setIsBrowserOpen(!isBrowserOpen)
  }

  return <div className="w-full h-full p-4 flex flex-col gap-4">
    <div className="h-14 flex items-center text-2xl font-bold">Playwright Test Runner</div>
    <div className="flex gap-4">
      <Input placeholder="https://www.example.com" onChange={(e) => setTempUrl(e.target.value)} className="flex-1 h-10" />
      <OpenBrowserButton handleClick={handleButtonClick} />
    </div>
    <CommandInput />
    <CommandHistory />

  </div>


}

export default LeftPanel
