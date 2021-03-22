require('./connections/connection.mongo')();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ status: 'success', payload: { apiVersion: 1.0, writtenBy: 'Abubakar Zubair Idris', supervisedBy: 'Khalil Mohammed Shams <shamskhalil@gmail.com>', date: 'March 2021' }, message: 'Welcome Conatct Rest API' });
});


//Contact Rooute
const contactRoute = require('./routes/route.contact')();
app.use('/api/v1/contact', contactRoute);


app.listen(3000, () => {
    console.log('Contact Server listening on port 3000')
});

module.exports.app = app;