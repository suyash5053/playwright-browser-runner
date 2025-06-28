import { Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const CommandInput = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-0 rounded-sm gap-0">
        <CardHeader className="p-0 gap-0">
          <CardTitle className="text-sm py-1 px-4 font-semibold bg-zinc-200 rounded-t-sm">Playwright Command (Ctrl + Enter to execute)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Textarea className="min-h-[200px] resize-none rounded-b-sm rounded-t-none" placeholder={`// Enter a single Playwright command, e.g.:
await page.goto('https://example.com');
await page.click('text=Login');
await page.fill('input[name=username]', 'test@example.com');`} />
        </CardContent>
      </Card>
      <Button variant="default" className="self-end"><Play />Execute Command</Button>
    </div>
  );
}

export default CommandInput;

