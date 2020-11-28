const express = require('express');
const path = require('path');

const PATH_PUBLIC_DIR = path.join(__dirname, '../public');


const app = express();

app.use(express.static(PATH_PUBLIC_DIR));

app.listen(3000, () => console.log('listening on port 3000\nhttp://localhost:3000/'));
