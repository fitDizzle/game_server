if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const db = require('./database/models/index');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// app.use(helmut())

app.get('/', (req, res) => {
    res.json({message: 'WELCOME!!!!'})
})



//add database here
require('./database/otherConnection'); 
db.sequelize.sync();
//app.use(routes);
app.use(routes);

app.listen(PORT, ()=>console.log(`This fool's running a Honda S ${PORT}`))