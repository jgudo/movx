const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static(publicPath));

app.get('*', (request, response) => {
  response.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up');
});
