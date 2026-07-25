import { prisma } from "@/lib/prisma";

export async function getDashboardContext(userId: string) {
  const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  const [
    recentNotes,
    todayTasks,
    todayEvents,
    noteCount,
    taskCount,
    eventCount,
  ] = await Promise.all([
    prisma.note.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    }),

    prisma.task.findMany({
      where: {
        userId,
        dueDate: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        dueDate: "asc",
      },
    }),

    prisma.event.findMany({
      where: {
        userId,
        startTime: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        startTime: "asc",
      },
    }),

    prisma.note.count({
      where: {
        userId,
      },
    }),

    prisma.task.count({
      where: {
        userId,
      },
    }),

    prisma.event.count({
      where: {
        userId,
      },
    }),
  ]);

  return {
    recentNotes,
    todayTasks,
    todayEvents,
    stats: {
      notes: noteCount,
      tasks: taskCount,
      events: eventCount,
    },
  };
}