import express from 'express';
import userRoutes from './routes/user.routes.js';
// import other routes...

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
// more routes...

export default app;