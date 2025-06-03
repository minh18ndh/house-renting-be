import express from 'express';
import * as postController from '../controllers/post.controller.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireRole } from '../middleware/requireRole.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all rental posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: "GPS coordinate to sort by distance (format: lat,lng)"
 *       - in: query
 *         name: priceRange
 *         schema:
 *           type: string
 *           enum: [0-200, 200-500, 500-1000, 1000-2000, 2000+]
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of posts (filtered and/or sorted)
 */
router.get('/', postController.getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested post
 *       404:
 *         description: Post not found
 */
router.get('/:id', postController.getPostById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post with
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *               price:
 *                 type: number
 *               area:
 *                 type: number
 *               location:
 *                 type: string
 *               bedroom:
 *                 type: number
 *               content:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Post created
 */
router.post(
  '/',
  requireAuth,
  upload.array('images', 5), // max 5 images
  postController.createPost
);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post (owner or admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: integer
 *               area:
 *                 type: integer
 *               location:
 *                 type: string
 *               bedroom:
 *                 type: integer
 *               content:
 *                 type: string
 *               isRented:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Post updated
 *       403:
 *         description: Forbidden
 */
router.put('/:id', requireAuth, postController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post (owner or admin)
 *     tags: [Posts]
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
 *         description: Post deleted
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', requireAuth, postController.deletePost);

export default router;