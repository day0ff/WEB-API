const express = require('express');
const path = require('path');
const hbs = require('hbs');

const PATH_PUBLIC_DIR = path.join(__dirname, '../public');
const PATH_HBS_VIEWS_DIR = path.join(__dirname, '../templates/views');
const PATH_HBS_PARTIALS_DIR = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', PATH_HBS_VIEWS_DIR);

hbs.registerPartials(PATH_HBS_PARTIALS_DIR);
hbs.registerHelper('json', (data) => {
    return JSON.stringify(data);
});

app.use(express.static(PATH_PUBLIC_DIR));

app.get('', (req, res) => {
    res.render('index', {menu:true});
});

app.get('/repka', (req, res) => {
    res.render('index', {repka:true});
});

app.get('/johny-cake', (req, res) => {
    res.render('index', {johnyCake:true});
});

app.get('/ryaba', (req, res) => {
    res.render('index', {ryaba:true});
});

app.listen(3000, () => console.log('listening on port 3000\nhttp://localhost:3000/'));
