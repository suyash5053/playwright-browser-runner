"use client"

import { Input } from "./ui/input"
import OpenBrowserButton from "./OpenBrowserButton"
import useUiStore from "@/store/useUiStore"
import { CommandHistory } from "./CommandHistory"
import CommandInput from "./CommandInput"
import { useState } from "react"
import { Url } from "@/types"
import useBrowserStore from "@/store/useBrowserStore"
import ClosePortsButton from "./ClosePortsButton"

const LeftPanel = () => {
  const [tempUrl, setTempUrl] = useState<Url>(null);
  const { isBrowserOpen, setIsBrowserOpen, isReady, setIsReady } = useUiStore()
  const { setUrl, addCommandToHistory } = useBrowserStore()
  const { setIsLoading } = useBrowserStore()

  const handleButtonClick = async () => {
    if (!isBrowserOpen){
      setIsLoading(true)
      try { 
        if (tempUrl === null) {
          return console.error("URL is required")
        }
        const response = await fetch("/api/browser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({url: tempUrl})
        })

        const data = await response.json()
        if (data.success) {
          setUrl(tempUrl)
          setIsBrowserOpen(!isBrowserOpen)
        }
        else {
          return console.error(`docker might not running or ${data.error}`)
        }
        
      } catch (error) {}
      setIsLoading(false)
    }
    else {
      setIsLoading(true)
      setIsBrowserOpen(!isBrowserOpen)
      try {
        const response = await fetch("/api/browser", {
          method: "DELETE"
        })
        const data = await response.json()
        if (data.success) {
          setIsBrowserOpen(!isBrowserOpen)
        }
        else {
          return console.error(`issues closing the browser or ${data.error}`)
        }
      } catch (error) {
        console.error("Error closing browser:", error)
      }
      setIsLoading(false)
    }
  }

  return <div className="w-full h-full p-4 flex flex-col gap-4">
    <div className="h-14 flex items-center text-2xl font-bold">Playwright Test Runner</div>
    <div className="flex gap-4">
      <Input placeholder="https://www.example.com" onChange={(e) => setTempUrl(e.target.value)} className="flex-1 h-10" />
      <div className="gap-2 flex">
      <OpenBrowserButton handleClick={handleButtonClick} />
      {/* {!isReady && <ClosePortsButton />} */}
      </div>
     
    </div>
    <CommandInput />
    <CommandHistory />

  </div>


}

export default LeftPanel
