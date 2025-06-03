import express from 'express';
import * as totalViewsController from '../controllers/totalviews.controller.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

/**
 * @swagger
 * /api/totalviews:
 *   get:
 *     summary: Get the total number of views
 *     tags: [TotalViews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total site views
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', requireAuth, requireRole('Admin'), totalViewsController.getTotalViews);

/**
 * @swagger
 * /api/totalviews:
 *   put:
 *     summary: Increase the total view count by 1
 *     tags: [TotalViews]
 *     responses:
 *       204:
 *         description: View count incremented
 */
router.put('/', totalViewsController.incrementView);

export default router;