import express from 'express';
import * as feedbackController from '../controllers/feedback.controller.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

/**
 * @swagger
 * /api/feedbackforms:
 *   get:
 *     summary: Get all feedback forms (admin only)
 *     tags: [FeedbackForms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all feedback
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', requireAuth, requireRole('Admin'), feedbackController.getAllFeedback);

/**
 * @swagger
 * /api/feedbackforms/user/{id}:
 *   get:
 *     summary: Get feedback submitted by specific user (admin only)
 *     tags: [FeedbackForms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of feedback submitted by the user
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/user/:id', requireAuth, requireRole('Admin'), feedbackController.getFeedbackByUser);

/**
 * @swagger
 * /api/feedbackforms:
 *   post:
 *     summary: Submit feedback
 *     tags: [FeedbackForms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Feedback submitted
 *       400:
 *         description: Missing content
 *       401:
 *         description: Unauthorized
 */
router.post('/', requireAuth, feedbackController.createFeedback);

export default router;