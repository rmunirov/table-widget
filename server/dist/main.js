const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const wait = (req, res, next) => {
    setTimeout(next, 3000);
};
app.get('/', wait, (req, res) => {
    res.send({ test: 123 });
});
app.listen(port, () => {
    console.log(`Server listening http://localhost:${port}`);
});
