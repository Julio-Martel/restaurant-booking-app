import express from 'express';
const app = express();

app.use(express.json());

import router from './routes/admin.routes.js';
import {login,register} from './controllers/auth.controllers.js';
import { authToken } from './middlewares/auth.middleware.js';
import { permisoAdmin } from './middlewares/permisos.middlewares.js';

app.use('/login/', login);
app.use('/register/', register);

app.use('/admin/', authToken, permisoAdmin, router);


export default app;