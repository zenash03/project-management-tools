import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"

export function BoardColumn({
  title,
  tasks = [],
  onAddTask,
}: {
  title: string
  tasks: React.ReactNode[]
  onAddTask?: () => void
}) {
  return (
    <div className="w-72 flex flex-col bg-muted/40 rounded-xl shadow-sm p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">
          {title} <span className="text-gray-500">({tasks.length})</span>
        </h3>
        <Button variant="ghost" size="icon" onClick={onAddTask}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <ScrollArea className="h-[500px]">
        <div className="flex flex-col gap-y-2">
            {tasks.length > 0 ? (
            tasks.map((task, i) => (
                <div key={i}>
                {task}
                </div>
            ))
            ) : (
            <Card className="p-4 text-sm text-muted-foreground text-center">
                No tasks
            </Card>
            )}
        </div>
        </ScrollArea>
    </div>
  )
}