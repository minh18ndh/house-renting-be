import { prisma } from '../prisma/client.js';

const VIEW_ID = 'total-view-counter';

export const incrementView = async () => {
  await prisma.totalViews.upsert({
    where: { id: VIEW_ID },
    update: { total: { increment: 1 } },
    create: { id: VIEW_ID, total: 1 },
  });
};

export const getTotalViews = async () => {
  const result = await prisma.totalViews.findUnique({ where: { id: VIEW_ID } });
  return result?.total ?? 0;
};