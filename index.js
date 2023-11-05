require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.PORT;

app.options('*', cors())
app.use(cors({
    origin: 'https://scrababble-client-939ac493651f.herokuapp.com',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(helmut())
app.use(routes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Scrababble!' })
})

app.listen(PORT, () => console.log(`This fool's running a Honda S ${PORT}`))