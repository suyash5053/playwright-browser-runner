import { findContainersUsingPorts } from "@/helpers"
import { cdpPort, vncPort } from "@/helpers/config"
import { execAsync } from "@/helpers"
const portsToCheck: number[] = [cdpPort, vncPort]

export const DELETE = async () => {
    try {
        const containersUsingPorts = await findContainersUsingPorts(portsToCheck)
        if (containersUsingPorts.length > 0) {
            for (const container of containersUsingPorts) {
                try {
                    await execAsync(`docker stop ${container}`)
                    await execAsync(`docker rm ${container}`)
                }
                catch (error) {
                    console.error("Error stopping container:", error)
                }
            }
        }
        return Response.json({
            success: true,
            message: "Ports closed successfully, you may continue"
        })
    } catch (error) {
        console.error("Error checking ports:", error)
        return Response.json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to close ports"
        })
    }
}
