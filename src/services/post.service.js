import { prisma } from '../prisma/client.js';

export const getAllPosts = async ({ categoryId, location, priceRange, userId }) => {
  const where = {
    ...(categoryId && { categoryId }),
    ...(getPriceFilter(priceRange)),
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

    const distance = (lat1, lon1, lat2, lon2) => {
      const toRad = (v) => (v * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    posts = posts.map(p => {
      const [lat, lng] = p.location.split(',').map(Number);
      return {
        ...p,
        distance: distance(queryLat, queryLng, lat, lng),
      };
    }).sort((a, b) => a.distance - b.distance);
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

const getPriceFilter = (range) => {
  switch (range) {
    case '0-200':
      return { price: { gte: 0, lt: 200 } };
    case '200-500':
      return { price: { gte: 200, lt: 500 } };
    case '500-1000':
      return { price: { gte: 500, lt: 1000 } };
    case '1000-2000':
      return { price: { gte: 1000, lt: 2000 } };
    case '2000+':
      return { price: { gte: 2000 } };
    default:
      return {}; // no filter
  }
};