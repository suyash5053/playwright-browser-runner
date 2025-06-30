"use client"

import useStore from "@/store/useUiStore"
import { Button } from "./ui/button"
import { Globe, Loader } from "lucide-react"
import useBrowserStore from "@/store/useBrowserStore"

const OpenBrowserButton = () => {
  const { isBrowserOpen, setIsBrowserOpen , isReady } = useStore()
  const { url, isLoading, setIsLoading  } = useBrowserStore()
  
  const handleClick = async () => {
    if (!isBrowserOpen){
      setIsLoading(true)
      try { 
        if (url === null) {
          return console.error("URL is required")
        }
        const response = await fetch("/api/browser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({url: url})
        })

        const data = await response.json()
        if (data.success) {
          setIsBrowserOpen(!isBrowserOpen)
        }
        else {
          return console.error(`docker might not running or ${data.error}`)
        }
        
      } catch (error) {
        console.log (error)
      } finally {
        setIsLoading(false)
      }
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
  
  return (
    <Button onClick={handleClick} variant="outline" className="gap-2 h-10 disabled:{isLoading || !isReady} flex items-center" disabled={isLoading || !isReady}>
      {isLoading ? (<Loader className="animate-spin" />) : isBrowserOpen ? (<><Globe /> Close Browser</>) : (<><Globe /> Open Browser</>)}
    </Button>
  )
}

export default OpenBrowserButton
