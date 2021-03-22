const mongoose = require('mongoose');
const { host, port, username, password, database } = require('../configs').mongo;
// const { MONGOHOST, MONGOUSER, MONGOPASS, MONGOPORT, MONGODB } = process.env;

// let host = MONGOHOST || 'mdb',
//     port = MONGOPORT || '27017',
//     username = MONGOUSER || 'sadeeque',
//     password = MONGOPASS || 'secret',
//     database = MONGODB || 'keks';


module.exports = () => {
    let options = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        poolSize: 10,
        keepAlive: 1,
        connectTimeoutMS: 30000,
        useUnifiedTopology: true
    };

    const db = mongoose.connection;
    db.on('connected', () => {
        console.log('We are connected to mongodb');
    });
    db.on('error', (err) => {
        console.log('Error connecting to mongodb ', err);
    });

    db.on('disconnect', () => {
        console.log('Oops we are disconnected from mongodb');
    });
    const mongoDbUri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
    mongoose.connect(mongoDbUri, options);
}