import * as commentService from '../services/comment.service.js';

export const getAllComments = async (req, res) => {
  const comments = await commentService.getAllComments();
  res.json(comments);
};

export const getCommentsByUser = async (req, res) => {
  const comments = await commentService.getCommentsByUser(req.params.id);
  res.json(comments);
};

export const createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment(req.body, req.userId);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await commentService.deleteComment(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};