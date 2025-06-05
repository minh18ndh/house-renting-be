import { prisma } from '../prisma/client.js';
import { calculateDistance, getPriceFilter } from '../utils/postServiceHelper.js';

export const getAllPosts = async ({ categoryId, location, priceRange, bedroom, userId }) => {
  const where = {
    ...(categoryId && { categoryId }),
    ...(getPriceFilter(priceRange)),
    ...(bedroom && { bedroom: Number(bedroom) }),
    ...(userId && { userId }),
  };

  let posts = await prisma.post.findMany({
    where,
    include: {
      user: { select: { id: true, fullName: true } },
      category: true,
      images: { take: 1 },
    },
  });

  // Sort by distance if 'location' is present
  if (location) {
    const [queryLat, queryLng] = location.split(',').map(Number);

    posts = posts.map(p => {
      const [lat, lng] = p.location.split(',').map(Number);
      return {
        ...p,
        distance: calculateDistance(queryLat, queryLng, lat, lng),
      };
    }).sort((a, b) => a.distance - b.distance);
  } else {
    posts = posts.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  }

  return posts;
};

export const getPostById = async (id) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          phone: true,
        }
      },
      category: true,
      images: true,
      comments: {
        include: {
          user: { select: { fullName: true } },
        },
      }
    }
  });
};

export const createPost = async (data, userId, imagePaths) => {
  const {
    categoryId, price, area, address, location, bedroom, content
  } = data;

  const created = await prisma.post.create({
    data: {
      categoryId,
      userId,
      price: Number(price),
      area: Number(area),
      address,
      location,
      bedroom: Number(bedroom),
      content,
      isRented: false,
      images: {
        create: imagePaths.map(path => ({ baseUrl: path })),
      },
    },
    include: {
      images: true,
    },
  });

  return {
    ...created,
    images: created.images.map(img => ({
      url: `${process.env.BASE_URL || 'http://localhost:3000'}/${img.baseUrl}`,
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
      address: data.address,
      location: data.location,
      bedroom: Number(data.bedroom),
      content: data.content,
      isRented: data.isRented,
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