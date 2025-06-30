import { z } from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['TASK', 'BUG', 'STORY', 'EPIC', 'SUBTASK']),
  status: z.string().optional(),
  projectId: z.string(),
  columnId: z.string().optional(),
  assigneeId: z.string().optional(),
  parentId: z.string().optional(),
});
export type Issue = z.infer<typeof issueSchema>;