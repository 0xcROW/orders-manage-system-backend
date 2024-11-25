import express from 'express';
import { router } from './src/routes/index.routes.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.URL || 'localhost';

app.use(express.json());
app.use(router);

    
app.listen(port, () => {
  console.log(`Server is running on http://${url}:${port}`);
});