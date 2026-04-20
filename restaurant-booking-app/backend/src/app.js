import express from 'express';
const app = express();

app.use(express.json());

import adminRoutes from './routes/admin.routes';

app.use('/admin/', adminRoutes);
//app.use('/cliente/');
//app.use('/restaurante/');


export default app;