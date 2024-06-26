const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const products = [];

app.get('/', (req, res) => {
    res.render('index', { products });
});

app.post('/add-product', (req, res) => {
    const { name, price } = req.body;
    if (name && !isNaN(price)) {
        products.push({ name, price: parseFloat(price) });
    }
    res.redirect('/');
});

app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page Not Found' });
});

app.listen(PORT, () => {
    console.log(`Use this link: http://localhost:${PORT}`);
});
