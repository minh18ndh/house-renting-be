import express from 'express';
import * as commentController from '../controllers/comment.controller.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

/**
 * @swagger
 * /api/commentforms:
 *   get:
 *     summary: Get all comment forms (admin only)
 *     tags: [CommentForms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all comments
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', requireAuth, requireRole('Admin'), commentController.getAllComments);

/**
 * @swagger
 * /api/commentforms/user/{id}:
 *   get:
 *     summary: Get comments by user ID (admin only)
 *     tags: [CommentForms]
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
 *         description: List of comments by user
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/user/:id', requireAuth, requireRole('Admin'), commentController.getCommentsByUser);

/**
 * @swagger
 * /api/commentforms:
 *   post:
 *     summary: Create a comment for a post
 *     tags: [CommentForms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - content
 *               - rating
 *             properties:
 *               postId:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Comment created
 *       400:
 *         description: Bad request or invalid data
 *       401:
 *         description: Unauthorized
 */
router.post('/', requireAuth, commentController.createComment);

/**
 * @swagger
 * /api/commentforms/{id}:
 *   delete:
 *     summary: Delete a comment (admin only)
 *     tags: [CommentForms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Comment deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Comment not found
 */
router.delete('/:id', requireAuth, requireRole('Admin'), commentController.deleteComment);

export default router;