import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function TaskDialog({ column }: { column: string }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")

  const handleCreate = () => {
    console.log(`Creating task "${title}" in column "${column}"`)
    setTitle("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          +
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task in {column}</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button className="mt-4" onClick={handleCreate}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  )
}