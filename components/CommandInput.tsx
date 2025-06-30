"use client"

import { Loader, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import useBrowserStore from "@/store/useBrowserStore";
import useUiStore from "@/store/useUiStore";

const CommandInput = () => {
  const [command, setCommand] = useState<string>("")
  const { isBrowserOpen } = useUiStore()
  const { addCommandToHistory } = useBrowserStore()
  const [isExecuting, setIsExecuting] = useState<boolean>(false)

  const handleCommandRun = async () => {
    if (!command.trim()) return
    try {
      setIsExecuting(true)
      const response = await fetch("/api/playwright", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ command: command })
      })

      if (response.headers.get('content-type')?.includes('image/png')) {
        const blob = await response.blob();
        const filename = response.headers.get('content-disposition')?.split('filename=')[1] || 'screenshot.png';
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename.replace(/"/g, '');
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        addCommandToHistory(command, true)
        setCommand("")
        return { success: true, message: 'Screenshot downloaded' };
      }

      const data = await response.json()
      if (data.success) {
        addCommandToHistory(command, data.success)
        setCommand("")
        return { success: true, message: 'Command executed successfully' };
      }
      else {
        addCommandToHistory(command, data.success)
        setCommand("")
        return { success: false, message: data.error }
      }
    } catch (error) {
      console.log(error)
      setCommand("")
      addCommandToHistory(command, false)
     }
    finally {
      setIsExecuting(false)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      handleCommandRun()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-0 rounded-sm gap-0">
        <CardHeader className="p-0 gap-0">
          <CardTitle className="text-sm py-1 px-4 font-semibold bg-zinc-200 rounded-t-sm">Playwright Command (Ctrl + Enter to execute)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Textarea className="min-h-[200px] resize-none rounded-b-sm rounded-t-none" value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={handleKeyDown} placeholder={`// Enter a single Playwright command, e.g.:
await page.goto('https://example.com');
await page.click('text=Login');
await page.fill('input[name=username]', 'test@example.com');`} />
        </CardContent>
      </Card>
      <Button variant="default" className="self-end" onClick={handleCommandRun} disabled={isExecuting || !isBrowserOpen}>{isExecuting ? <div className="flex items-center gap-2"><Loader /> Executing...</div> : <div className="flex items-center gap-2"><Play />Execute Command</div>}</Button>
    </div>
  );
}

export default CommandInput;

