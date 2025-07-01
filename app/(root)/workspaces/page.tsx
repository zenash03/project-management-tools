"use client"

import { BoardColumn } from '@/app/components/board-column'
import { TaskCard } from '@/app/components/task-card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Page = () => {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [columns, setColumns] = useState<any[]>([])
    const [selectedColumnId, setSelectedColumnId] = useState<string>("")

  const boardId = 'cmchpptek000cvyk8la4ps7bt' 

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/boards/${boardId}/columns`)
      setColumns(res.data)
    }
    fetchData()
  }, [])

  const handleAddTask = async (columnId: string) => {
    if (!title.trim()) return
    await axios.post(`/api/issues`, {
      title,
      columnId,
      type: "TASK", 
      projectId: "cmchppr000008vyk8ltqo0j2p", 
    })
    setTitle("")
    setOpen(false)
    // Re-fetch
    const res = await axios.get(`/api/boards/${boardId}/columns`)
    setColumns(res.data)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Workspace Page</h1>

      <div className="flex gap-4 overflow-x-auto">
        {columns.map((col) => (
          <BoardColumn
            key={col.id}
            title={col.name}
            tasks={col.issues.map((task: any) => (
              <TaskCard
                key={task.id}
                title={task.title}
                tag={task.type}
                timeLogged={"0h 0m"}
                assignee={{
                  image: task.assignee?.image || "",
                  initials: task.assignee?.name?.[0] || "U"
                }}
              />
            ))}
            onAddTask={() => {
              setOpen(true)
              setSelectedColumnId(col.id)
            }}
          />
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={() => handleAddTask(selectedColumnId)} className="mt-4">
            Create Task
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Page
