const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5001;
const reflect = require('./routes/reflect.router');
const user = require('./routes/user.router');
const { v4: uuidv4 } = require('uuid')

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json());
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/reflect', reflect);
app.use('/user', user);

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});