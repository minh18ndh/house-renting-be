import { prisma } from '../prisma/client.js';

export const getAllFeedback = async () => {
  return prisma.feedbackForm.findMany({
    orderBy: {
      submitDate: 'desc',
    },
  });
};

export const createFeedback = async (content) => {
  if (!content) throw new Error('Content is required');

  return prisma.feedbackForm.create({
    data: {
      content,
    }
  });
};