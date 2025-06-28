"use client"

import useStore from "@/store"

const EmbeddedBrowser = () => {
    const { isBrowserOpen } = useStore()
    return <div className="h-full">
        {!isBrowserOpen && 
            <div className="flex flex-col h-full justify-center items-center gap-2">
                <div className="text-xl font-semibold">Browser not open</div>
                <div className="text-xl text-muted-foreground">Click "Open Browser" to start</div>
            </div>
        }
        {isBrowserOpen && <iframe src="http://localhost:8080/index.html?password=password&resize=scale" className="h-full w-full" />}
    </div>
}

export default EmbeddedBrowser
