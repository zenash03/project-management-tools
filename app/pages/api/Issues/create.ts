import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { issueSchema } from '@/lib/validation/issueSchema';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const parsed = issueSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors });
  }

  try {
    const issue = await prisma.issue.create({
      data: parsed.data,
    });
    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create issue' });
  }
}
