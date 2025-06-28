import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CommandHistory() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Command History</CardTitle>
      </CardHeader>
      <CardContent>
        Commands
      </CardContent>
    </Card>
  )
}

