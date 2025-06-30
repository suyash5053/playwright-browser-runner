"use server"
import { ScreenshotResult } from "@/types";
import { exec } from "child_process";
import { Page } from "playwright";
import { promisify } from "util";
import dns from "dns/promises"

export const execAsync = promisify(exec)

export const executePlaywrightCommand = async (page: Page, command: string): Promise<string | ScreenshotResult> => {
    try {
        const cleanCommand: string = command.trim().replace(/;$/, "")

        if (cleanCommand.startsWith("await page.goto(")) {
            const match: RegExpMatchArray | null = cleanCommand.match(/page\.goto\(['"`]([^'"`]+)['"`](?:,\s*{.*})?\)/)
            if (match) {
                const url: string = match[1]
                await page.goto(url, { waitUntil: "networkidle" })
                return `Navigated to: ${url}`
            }
        }

        if (cleanCommand.startsWith("await page.click(")) {
            const match: RegExpMatchArray | null = cleanCommand.match(/page\.click\(['"`]([^'"`]+)['"`](?:,\s*{.*})?\)/)
            if (match) {
                const selector: string = match[1]
                await page.click(selector)
                return `Clicked on: ${selector}`
            }
        }

        if (cleanCommand.startsWith("await page.fill(")) {
            const match: RegExpMatchArray | null = cleanCommand.match(/page\.fill\((['"`])(.*?)(?<!\\)\1\s*,\s*(['"`])(.*?)(?<!\\)\3\)/)
            if (match) {
                let selector = match[2];
                const text = match[4];

                selector = selector.replace(/\\"/g, '"').replace(/\\'/g, "'");

                await page.fill(selector, text);
                return `Filled: ${selector}, with: ${text}`;
            }
        }

        if (cleanCommand.startsWith('page.waitForSelector(') || cleanCommand.startsWith('await page.waitForSelector(')) {
            const match: RegExpMatchArray | null = cleanCommand.match(/page\.waitForSelector\(['"`]([^'"`]+)['"`](?:,\s*{.*})?\)/)
            if (match) {
                const selector: string = match[1]
                await page.waitForSelector(selector)
                return `Waited for selector: ${selector}`
            }
        }

        if (cleanCommand === 'page.screenshot()' || cleanCommand === 'await page.screenshot()') {
            try {
              const screenshot = await page.screenshot({ timeout: 10000 }); // Increase timeout
              const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
              return {
                action: 'download',
                mimeType: 'image/png',
                data: screenshot,
                filename: `screenshot-${timestamp}.png`
              };
            } catch (err) {
              console.error('Screenshot failed:', err);
              throw new Error('Screenshot failed: ' + (err as Error).message);
            }
          }

        if (cleanCommand === "page.url()" || cleanCommand === "await page.url()") {
            const url: string = await page.url()
            return `Current URL: ${url}`
        }

        if (cleanCommand === 'page.title()' || cleanCommand === 'await page.title()') {
            const title: string = await page.title()
            return `Page title: ${title}`
        }

        if (cleanCommand.startsWith('page.evaluate(') || cleanCommand.startsWith('await page.evaluate(')) {
            const match: RegExpMatchArray | null = cleanCommand.match(/page\.evaluate\(\(\)\s*=>\s*(.+)\)/)
            if (match) {
                const expression = match[1]
                if (/^[a-zA-Z0-9\s\.\(\)'"_=><!&|+\-*\/%?:]+$/.test(expression)) {
                    const result = await page.evaluate(() => eval(expression))
                    return `Evaluation result: ${JSON.stringify(result)}`
                } else {
                    throw new Error("Complex evaluations not allowed for security")
                }
            }
        }

        throw new Error(`Unsupported or malformed command: ${cleanCommand}`)
    } catch (error) {
        throw new Error(`Command execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

export const findContainersUsingPorts = async (ports: number[]) => {

    const runningContainers = []
    for (const port of ports) {
        try {
            const { stdout } = await execAsync(`docker ps --format "{{.ID}}" --filter "publish=${port}"`)
            if (stdout.trim()) {
                const containerIds = stdout.trim().split('\n')
                runningContainers.push(...containerIds)
            }
        }
        catch (error) {
            console.error(`Error checking container status: ${error}`)
        }
    }
    return [...new Set(runningContainers)]
}

export const getCdpEndpoint = async (): Promise<string> => {
    const { address } = await dns.lookup('host.docker.internal')
    return `http://${address}:9222`
}
  


