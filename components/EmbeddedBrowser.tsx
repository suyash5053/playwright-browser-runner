"use client"

import { password } from "@/helpers/config"
import useStore from "@/store/useUiStore"

const EmbeddedBrowser = () => {
    const { isBrowserOpen } = useStore()
    return (<div className="h-full">
        {!isBrowserOpen &&
            <div className="flex flex-col h-full justify-center items-center gap-2">
                <div className="text-xl font-semibold">Browser not open</div>
                <div className="text-xl text-muted-foreground">Click &quot;Open Browser&quot; to start</div>
            </div>
        }
        {isBrowserOpen &&
            <div className="h-full">
                <iframe src={`http://host.docker.internal:8080/index.html?password=${password}&autoconnect=1`} className="h-full w-full" />
            </div>}
    </div>)
}

export default EmbeddedBrowser
