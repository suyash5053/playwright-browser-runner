"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useBrowserStore from "@/store/useBrowserStore"

export function CommandHistory() {
  const { commandsHistory } = useBrowserStore()
  
  return (<Card className="flex-1 gap-0 p-0">
      <CardHeader className="pt-4">
        <CardTitle className="text-sm font-medium">Command History</CardTitle>
      </CardHeader>
      <CardContent className="py-0 text-sm">
        {commandsHistory.map((command, index) => (
          <div key={index}>{command.timestamp} - {command.message} {command.success ? "✅" : "❌"}</div>
        ))}
      </CardContent>
    </Card>)
}

