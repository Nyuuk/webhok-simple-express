const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Ganti dengan port yang Anda inginkan

app.use(bodyParser.json());

const webhookData = [];

app.post('/webhook', (req, res) => {
  const payload = req.body;

  // Menyimpan payload ke dalam array
  webhookData.push(payload);

  console.log('Received webhook payload:', payload);
  res.status(200).json({ message: 'Webhook received successfully', data: payload });
});

app.get('/webhook', (req, res) => {
  res.status(200).json(webhookData);
});

app.delete('/webhook/:index', (req, res) => {
  const index = req.params.index;

  if (index < 0 || index >= webhookData.length) {
    return res.status(400).json({ error: 'Invalid index' });
  }

  webhookData.splice(index, 1);
  res.status(200).json({ message: 'Data deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
