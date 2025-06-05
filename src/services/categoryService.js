import { prisma } from '../prisma/client.js';

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
};