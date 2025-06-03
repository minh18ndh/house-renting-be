import { prisma } from '../prisma/client.js';

export const getAllFeedback = async () => {
  return prisma.feedbackForm.findMany({
    include: {
      user: { select: { id: true, fullName: true } }
    }
  });
};

export const getFeedbackByUser = async (userId) => {
  return prisma.feedbackForm.findMany({
    where: { userId },
    include: {
      user: { select: { id: true, fullName: true } }
    }
  });
};

export const createFeedback = async (content, userId) => {
  if (!content) throw new Error('Content is required');

  return prisma.feedbackForm.create({
    data: {
      userId,
      content,
    }
  });
};