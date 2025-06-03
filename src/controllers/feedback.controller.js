import * as feedbackService from '../services/feedback.service.js';

export const getAllFeedback = async (req, res) => {
  const feedbacks = await feedbackService.getAllFeedback();
  res.json(feedbacks);
};

export const getFeedbackByUser = async (req, res) => {
  const feedbacks = await feedbackService.getFeedbackByUser(req.params.id);
  res.json(feedbacks);
};

export const createFeedback = async (req, res) => {
  try {
    const feedback = await feedbackService.createFeedback(req.body.content, req.userId);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};