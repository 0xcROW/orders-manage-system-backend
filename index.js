import express from 'express';
import { router } from './src/routes/index.routes.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.URL || 'localhost';

app.use(express.json());
app.use(router);

//TODO add auth middleware to validate if the admin is logged in
//TODO validations with zod
//TODO add JWT middleware
//TODO add error handling middleware
//TODO add tests

app.listen(port, () => {
  console.log(`Server is running on http://${url}:${port}`);
});