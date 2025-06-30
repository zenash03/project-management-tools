'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type Issue = {
  id: string
  title: string
  type: string
  status: string
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/issues')
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {issues.map((issue) => (
        <Card key={issue.id} className="hover:shadow-md transition">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg">{issue.title}</h2>
            <p className="text-muted-foreground">{issue.type}</p>
            <span className="text-xs">{issue.status}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
