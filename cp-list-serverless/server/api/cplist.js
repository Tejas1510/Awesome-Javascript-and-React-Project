const fetch = require('node-fetch');
const api_url = `https://clist.by:443/api/v1/contest/?order_by=-start`;
require('dotenv').config();
async function getData(req, res) {
    // https://vercel.com/knowledge/how-to-enable-cors
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('access-control-allow-methods', 'GET,OPTIONS');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    try {
        const rawdata = await fetch(api_url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.API_KEY,
            },
        });
        const data = await rawdata.json();
        res.send(data);


    } catch (error) {
        res.status(500);
        const response = error.message || {};
        res.send({
            message: error.message,
            response,
        });
    }
}


module.exports = getData;