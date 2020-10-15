const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoDBURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        console.log("Mongo Db Connected");
    } catch (error) {
        console.log("Not connected");
    }
}

module.exports = connectDB;