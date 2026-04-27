import adminRoutes from './routes/admin.routes.js';
import authRoutes from './routes/auth.routes.js';
import express from 'express';

const app = express();

app.use(express.json());

app.use('/api/auth/', authRoutes);
app.use('/api/admin/', adminRoutes);

export default app;