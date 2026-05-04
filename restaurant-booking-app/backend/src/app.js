import adminRoutes from './routes/admin.routes.js';
import authRoutes from './middlewares/auth.routes.js';
import clienteRoutes from './routes/clientes.routes.js';
import dueñoRoutes from './controllers/dueño.routes.js';
import express from 'express';

const app = express();

app.use(express.json());

app.use('/api/auth/', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/dueño', dueñoRoutes);

export default app;