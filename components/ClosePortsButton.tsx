import { Button } from "./ui/button"
import useUiStore from "@/store/useUiStore"
import useBrowserStore from "@/store/useBrowserStore"
import { Loader } from "lucide-react"

const ClosePortsButton = () => {
    const { setIsReady } = useUiStore()
    const { addCommandToHistory, setIsLoading, isLoading } = useBrowserStore()
    const handleClick = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("api/close-ports", {
                method: "DELETE"
            })
            const data = await response.json()
            if (data.success) {
                setIsReady(true)
                addCommandToHistory(data.message, data.success)
            }
        }
        catch (error) {
            addCommandToHistory(`Error closing ports: ${error}`, false)
        }
        finally {
            setIsLoading(false)
        }
    }
    return <Button variant="outline" size={"lg"} onClick={handleClick}  disabled={isLoading}>{isLoading ? <Loader className="animate-spin"/> : "Close Ports"}</Button>
}

export default ClosePortsButton
