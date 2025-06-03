import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import { setupSwagger } from './swagger.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/uploads', express.static('public/uploads'));
app.use('/api/commentforms', commentRoutes);
app.use('/api/feedbackforms', feedbackRoutes);

// Swagger UI
setupSwagger(app);

export default app;