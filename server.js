const express = require('express');
const app = express();
const connectDB = require('./db/connection');

connectDB();

app.get('/', (req, res) => res.send("Backend APIs Running"));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const Port = process.env.PORT || 5000;

app.listen(Port, () => console.log(`Listening on port:${Port}`));