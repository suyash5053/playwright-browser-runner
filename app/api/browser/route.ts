import { execAsync } from "@/helpers"
import { cdpEndpoint, cdpPort, dockerImage, vncPort } from "@/helpers/config"

let containerId: string | null = null

export const POST = async (req: Request) => {
    try {
        const { url } = await req.json()

        if (!url) return Response.json({ error: "URL is required" }, { status: 400 })

        if (containerId) {
            try {
                await execAsync(`docker stop ${containerId}`)
                await execAsync(`docker rm ${containerId}`)
            } catch (error) {
                console.error("Error stopping browser container:", error)
            }
        }

        const dockerCommand = `docker run -d -e PORT=${vncPort} -p ${vncPort}:${vncPort} -p ${cdpPort}:${cdpPort} -e START_URL=${url} ${dockerImage}`
        const { stdout } = await execAsync(dockerCommand)
        containerId = stdout.trim()
        await new Promise((resolve) => setTimeout(resolve, 2500))

        return Response.json({
            success: true,
            containerId,
            url,
            cdpEndpoint,
            status: "running"
        }, { status: 200 })

    } catch (error) {
        console.error("Error starting browser container:", error)

        return Response.json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to start browser"
        }, { status: 500 })
    }
}

export const GET = async () => {
    let isRunning: boolean = false
    if (containerId) {
        try {
            const { stdout } = await execAsync(`docker ps -q -f id=${containerId}`)
            isRunning = stdout.trim().length > 0
        }
        catch (error) {
            console.error("Error checking container status:", error)
            isRunning = false
        }
    }

    return Response.json({
        status: isRunning ? "running" : "stopped",
        containerId: isRunning ? containerId : null,
        cdpEndpoint: isRunning ? cdpEndpoint : null,
    }, { status: 200 })
}

export const DELETE = async () => {
    if (!containerId) {
        return Response.json({
            error: "Container not found"
        }, { status: 404 })
    }

    try {
        await execAsync(`docker stop ${containerId}`)
        await execAsync(`docker rm ${containerId}`)

        const stoppedContainerId: string = containerId
        containerId = null

        return Response.json({
            success: true,
            message: `Container ${stoppedContainerId} stopped successfully`,
        }, { status: 200 })

    } catch (error) {
        console.error("Error stopping container:", error)

        return Response.json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to stop container"
        }, { status: 500 })
    }
}
