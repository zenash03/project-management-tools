import { PrismaClient, IssueType } from '@prisma/client';

const prisma = new PrismaClient();

export const main = async () => {
  await prisma.$connect();

  // USERS
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'John Doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'Jane Smith',
    },
  });

  // WORKSPACES
  const workspaceA = await prisma.workspace.create({
    data: {
      name: 'Workspace A',
    },
  });

  const workspaceB = await prisma.workspace.create({
    data: {
      name: 'Workspace B',
    },
  });

  // WORKSPACE MEMBERS
  await prisma.workspaceMember.createMany({
    data: [
      {
        userId: user1.id,
        workspaceId: workspaceA.id,
        role: 'admin',
      },
      {
        userId: user2.id,
        workspaceId: workspaceA.id,
        role: 'member',
      },
      {
        userId: user1.id,
        workspaceId: workspaceB.id,
        role: 'admin',
      },
    ],
  });

  // PROJECTS
  const projectX = await prisma.project.create({
    data: {
      name: 'Project X',
      workspaceId: workspaceA.id,
    },
  });

  const projectY = await prisma.project.create({
    data: {
      name: 'Project Y',
      workspaceId: workspaceB.id,
    },
  });

  // BOARDS
  const boardX = await prisma.board.create({
    data: {
      projectId: projectX.id,
    },
  });

  const boardY = await prisma.board.create({
    data: {
      projectId: projectY.id,
    },
  });

  // BOARD COLUMNS
  const columnToDoX = await prisma.boardColumn.create({
    data: {
      boardId: boardX.id,
      name: 'To Do',
      order: 1,
    },
  });

  const columnProgressX = await prisma.boardColumn.create({
    data: {
      boardId: boardX.id,
      name: 'In Progress',
      order: 2,
    },
  });

  const columnBacklogY = await prisma.boardColumn.create({
    data: {
      boardId: boardY.id,
      name: 'Backlog',
      order: 1,
    },
  });

  const columnDoingY = await prisma.boardColumn.create({
    data: {
      boardId: boardY.id,
      name: 'Doing',
      order: 2,
    },
  });

  // ISSUES
  const issue1 = await prisma.issue.create({
    data: {
      title: 'Issue 1',
      description: 'Initial task in Project X',
      type: IssueType.TASK,
      status: 'Open',
      projectId: projectX.id,
      columnId: columnToDoX.id,
    },
  });

  const issue2 = await prisma.issue.create({
    data: {
      title: 'Issue 2',
      description: 'Bug fix needed in Project X',
      type: IssueType.BUG,
      status: 'In Progress',
      projectId: projectX.id,
      columnId: columnProgressX.id,
      assigneeId: user1.id,
    },
  });

  const issue3 = await prisma.issue.create({
    data: {
      title: 'Issue 3',
      description: 'Story task in Project Y',
      type: IssueType.STORY,
      status: 'Backlog',
      projectId: projectY.id,
      columnId: columnBacklogY.id,
    },
  });

  const epic = await prisma.issue.create({
    data: {
      title: 'Epic Issue',
      description: 'Large feature work in Project Y',
      type: IssueType.EPIC,
      status: 'Doing',
      projectId: projectY.id,
      columnId: columnDoingY.id,
    },
  });

  await prisma.issue.createMany({
    data: [
      {
        title: 'Subtask 1',
        description: 'First subtask of Epic',
        type: IssueType.SUBTASK,
        status: 'Doing',
        projectId: projectY.id,
        columnId: columnDoingY.id,
        assigneeId: user1.id,
        parentId: epic.id,
      },
      {
        title: 'Subtask 2',
        description: 'Second subtask of Epic',
        type: IssueType.SUBTASK,
        status: 'Doing',
        projectId: projectY.id,
        columnId: columnDoingY.id,
        assigneeId: user2.id,
        parentId: epic.id,
      },
    ],
  });

  console.log('✅ Seeding complete!');
};

main()
  .catch((err) => {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
