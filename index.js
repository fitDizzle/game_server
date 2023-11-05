require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(helmut())
app.use(routes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Scrababble!' })
})

app.listen(PORT, () => console.log(`This fool's running a Honda S ${PORT}`))