import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TaskCard({ title, tag, timeLogged, assignee }: {title: string, tag: string, timeLogged: string, assignee: { image: string, initials: string }}) {
  return (
    <Card className="p-3 space-y-2 cursor-grab shadow-sm">
      <div className="flex justify-between items-start">
        <Badge variant="secondary">{tag}</Badge>
      </div>
      <div className="text-sm font-medium">{title}</div>
      <CardContent className="flex justify-between items-center px-0 py-1">
        <span className="text-xs text-muted-foreground">{timeLogged}</span>
        <Avatar className="h-6 w-6">
          <AvatarImage src={assignee.image} />
          <AvatarFallback>{assignee.initials}</AvatarFallback>
        </Avatar>
      </CardContent>
    </Card>
  )
}