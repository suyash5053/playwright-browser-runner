export interface CommandEntry {
    timestamp: string,
    message: string,
    success: boolean
}

export interface ScreenshotResult {
    action: 'download';
    mimeType: 'image/png';
    data: Buffer;
    filename: string;
}

export type Url = string | null
