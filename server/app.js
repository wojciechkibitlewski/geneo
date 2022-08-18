require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParse = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3500;

const app = express();

const {logger} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const connectDb = require('./config/dbConnect');
const {logEvents} = require('./middleware/logger');

connectDb();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParse());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routers/root'));
app.use('/persons', require('./routers/personRouters'));
app.use('/suggest', require('./routers/suggestRouters'));
app.use('/addfather', require('./routers/addfatherRouters'));

app.all('*', (req,res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname,'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: "Page not found"})
    } else {
        res.type('txt').send('404. Page not found')
    }
   
})
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to database')
    app.listen(PORT, () =>console.log(`Server running on port ${PORT}`));
})
mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
    
})