import { prisma } from '../prisma/client.js';

export const getAllApprovedPosts = async () => {
  return prisma.post.findMany({
    where: { isApproved: true },
    include: { user: true, category: true, images: true }
  });
};

export const getPostById = async (id) => {
  return prisma.post.findUnique({
    where: { id },
    include: { user: true, category: true, images: true, comments: true }
  });
};

export const createPost = async (data, userId, imagePaths) => {
  const {
    categoryId, price, area, location, bedroom, content
  } = data;

  const created = await prisma.post.create({
    data: {
      categoryId,
      userId,
      price: Number(price),
      area: Number(area),
      location,
      bedroom: Number(bedroom),
      content,
      isApproved: false,
      isRented: false,
      images: {
        create: imagePaths.map(path => ({ base: path })),
      },
    },
    include: {
      images: true,
    },
  });

  return {
    ...created,
    images: created.images.map(img => ({
      url: `${process.env.BASE_URL || 'http://localhost:3000'}/${img.base}`,
    })),
  };
};

export const updatePost = async (postId, data, userId, role) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error('Post not found');
  if (post.userId !== userId && role !== 'Admin') {
    throw new Error('Not authorized');
  }

  return prisma.post.update({
    where: { id: postId },
    data,
  });
};

export const deletePost = async (postId, userId, role) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error('Post not found');
  if (post.userId !== userId && role !== 'Admin') {
    throw new Error('Not authorized');
  }

  await prisma.post.delete({ where: { id: postId } });
};