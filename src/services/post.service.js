import { prisma } from '../prisma/client.js';

export const getAllApprovedPosts = () => {
  return prisma.post.findMany({
    where: { isApproved: true },
    include: {
      images: {
        take: 1,
      },
      user: {
        select: {
          id: true,
          fullName: true,
        }
      },
      category: true,
    }
  });
}

export const getPostById = async (id) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
        }
      },
      category: true,
      images: true,
      comments: true,
    }
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
    data: {
      price: Number(data.price),
      area: Number(data.area),
      location: data.location,
      bedroom: Number(data.bedroom),
      content: data.content,
      isRented: data.isRented,
    }
  });
};

export const approvePost = async (postId) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error('Post not found');

  return prisma.post.update({
    where: { id: postId },
    data: {
      isApproved: true,
    }
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