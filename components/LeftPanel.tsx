"use client"

import { Input } from "./ui/input"
import OpenBrowserButton from "./OpenBrowserButton"
import useUiStore from "@/store/useUiStore"
import { CommandHistory } from "./CommandHistory"
import CommandInput from "./CommandInput"
import useBrowserStore from "@/store/useBrowserStore"
import ClosePortsButton from "./ClosePortsButton"

const LeftPanel = () => {
  const { isReady } = useUiStore()
  const { setUrl } = useBrowserStore()

  return (<div className="w-full h-full p-4 flex flex-col gap-4">
    <div className="h-14 flex items-center text-2xl font-bold">Playwright Test Runner</div>
    <div className="flex gap-4">
      <Input placeholder="https://www.example.com" onChange={(e) => setUrl(e.target.value)} className="flex-1 h-10" />
      <div className="gap-2 flex">
      <OpenBrowserButton />
      {!isReady && <ClosePortsButton />}
      </div>
    </div>
    <CommandInput />
    <CommandHistory />
  </div>)
}

export default LeftPanel
