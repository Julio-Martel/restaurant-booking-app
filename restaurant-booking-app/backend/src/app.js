import express from 'express';
const app = express();

app.use(express.json());

import adminRoutes from './routes/admin.routes';
import {login,register} from './controllers/auth.controllers';


app.use('/login/', login);
app.use('/register/', register);

app.use('/admin/', adminRoutes);
//app.use('/cliente/');
//app.use('/restaurante/');


export default app;