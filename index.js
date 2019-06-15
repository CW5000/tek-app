const axios = require('axios');
const express = require('express');
const app = express();

app.listen(4000);

/// Root.
app.get('/', function(req, res) {
    res.status(200).send('This is the main resource.');
})

/// Main method - returns all state information by calling upon state API.
app.get('/ByStateAbbrev/:abbrev', function (req, res){
    axios.get('http://services.groupkt.com/state/get/USA/' + req.param('abbrev'))
    .then(response => {
        res.send(response.data);
        console.log(req.params);
    })
    .catch(err => {
        res.send({err});
    });
});