import express from 'express';
import router from './router.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(router);

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));

export default app;