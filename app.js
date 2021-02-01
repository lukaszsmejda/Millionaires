const express = require('express');
const path = require('path');

const app = express();

app.listen(3000, () => {
    console.log('server is listening at port 3000')
})

app.use(express.static(
    path.join(__dirname, 'public')
))