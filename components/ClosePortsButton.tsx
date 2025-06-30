import { Button } from "./ui/button"
import useUiStore from "@/store/useUiStore"
import useBrowserStore from "@/store/useBrowserStore"

const ClosePortsButton = () => {
    const { setIsReady } = useUiStore()
    const { addCommandToHistory } = useBrowserStore()
    const handleClick = async () => {
        try {
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
    }
    return <Button variant="outline" size={"lg"} onClick={handleClick}>Close Ports</Button>
}

export default ClosePortsButton
