import * as postService from '../services/post.service.js';

export const getAllApprovedPosts = async (req, res) => {
  const { categoryId, location, priceRange } = req.query;
  const posts = await postService.getAllApprovedPosts({ categoryId, location, priceRange });
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

export const createPost = async (req, res) => {
  const imagePaths = req.files.map(file => `uploads/${file.filename}`);
  const post = await postService.createPost(req.body, req.userId, imagePaths);
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body, req.userId, req.role);
    res.json(post);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

export const approvePost = async (req, res) => {
  try {
    const post = await postService.approvePost(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.id, req.userId, req.role);
    res.status(204).end();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};