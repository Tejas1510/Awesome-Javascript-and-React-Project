const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fetch = require('node-fetch');
const {
    raw
} = require('express');

const app = express();
const url = 'https://covid19.mhpolice.in/status';
app.use(morgan('dev'));
app.use(cors());
app.get('/', (req, res) => {
    res.json({
        message: "HELLO WORLD",
    })
})

app.get('/:id', async (req, res, next) => {
    const id = 'YAV08592051201988481';
    try {
        const item = setInterval(getData, 10000);
    } catch (error) {
        next(error);
    }
});
async function getData(id) {
    const combinedUrl = `${url}?tid=${id}`;
    const rawData = await fetch(combinedUrl);
    const data = await rawData.text();
    if (data.includes('Download your ePass here')) {
        //SEND THE DATA TO RECEPIENT BY EMAIL.
        console.log("got it");
        clearInterval(item);
        return true;
    } else {
        console.log('Nope didnt got');
        return false;
    }
}

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening on port', port);
});