import { Browser, chromium, Page } from 'playwright'
import { executePlaywrightCommand } from "@/helpers"
const CDP_ENDPOINT = 'http://localhost:9222'

let browser: Browser | null = null
let page: Page | null = null

const ensureConnection = async () => {
  if (!browser || !page) {
    try {
      browser = await chromium.connectOverCDP(CDP_ENDPOINT)

      const contexts = browser.contexts()
      let foundPage = null

      for (const context of contexts) {
        const pages = context.pages()
        if (pages.length > 0) {
          foundPage = pages[0]
          break
        }
      }

      if (foundPage) {
        page = foundPage
      } else {
        const context = contexts[0] || await browser.newContext()
        page = await context.newPage()
      }

      console.log('Connected to existing browser instance')
    } catch (error) {
      console.error('Failed to connect to browser:', error)
      throw error
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const command = body.command

    if (!command || typeof command !== 'string') {
      return Response.json({
        success: false,
        error: "Command is required and must be a string"
      }, { status: 400 })
    }
    await ensureConnection()

    if (!page) {
      return Response.json({
        success: false,
        error: "Page not initialized"
      }, { status: 500 })
    }

    const result = await executePlaywrightCommand(page, command)
    if (typeof result !== 'string' && result.action === 'download') {
      return new Response(result.data, {
        headers: {
          'Content-Type': result.mimeType,
          'Content-Disposition': `attachment; filename="${result.filename}"`,
          'Access-Control-Expose-Headers': 'Content-Disposition'
        }
      });
    }
    return Response.json({
      success: true,
      result: result,
      command: command
    });

  } catch (error) {
    console.error("Error:", error)


    browser = null
    page = null

    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : "Command execution failed",
    }, { status: 500 })
  }
}

process.on('SIGTERM', async () => {
  if (browser) {
    try {
      await browser.close()
    } catch (e) {
      console.error('Error closing browser:', e)
    }
  }
})

process.on('SIGINT', async () => {
  if (browser) {
    try {
      await browser.close()
    } catch (e) {
      console.error('Error closing browser:', e)
    }
  }
})
