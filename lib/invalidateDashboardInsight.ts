import { prisma } from "@/lib/prisma";

export async function invalidateDashboardInsight(userId: string) {
  await prisma.dashboardInsight.deleteMany({
    where: {
      userId,
    },
  });
}