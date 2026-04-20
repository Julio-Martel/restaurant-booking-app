import express from 'express';
const app = express();

app.use(express.json());

app.use('/clientes');
//app.use('/admin');
//app.use('/restaurantes')


export default app;