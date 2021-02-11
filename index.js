const express = require('express');
const app = express();

app.get('/', (req, res) =>
{
    res.send({ version: '1.0.1' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);