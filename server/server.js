import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

import apiRoutes from './router/apiRoutes.js'

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api', apiRoutes);

app.get(/^\/[^.]*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.use((req, res) => {
  res.status(404).send('Resource not found');
});


app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});