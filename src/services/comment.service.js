import { prisma } from '../prisma/client.js';

export const getAllComments = async () => {
  return prisma.commentForm.findMany({
    include: {
      user: { select: { id: true, fullName: true, email: true } },
      post: { select: { id: true, address: true } }
    }
  });
};

export const createComment = async ({ postId, content, rating }, userId) => {
  if (!content || rating < 1 || rating > 5) {
    throw new Error('Invalid content or rating');
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error('Post not found');

  const comment = await prisma.commentForm.create({
    data: {
      postId,
      userId,
      content,
      rating: Number(rating),
    },
  });

  return comment;
};

export const deleteComment = async (id) => {
  const existing = await prisma.commentForm.findUnique({ where: { id } });
  if (!existing) throw new Error('Comment not found');
  await prisma.commentForm.delete({ where: { id } });
};