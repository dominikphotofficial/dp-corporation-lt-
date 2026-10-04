import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.static(__dirname, { extensions: ['html'] }));

app.get('/en*', (req, res) => {
  res.sendFile(path.join(__dirname, 'en', 'index.html'));
});

app.get('/lt*', (req, res) => {
  res.sendFile(path.join(__dirname, 'lt', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
