const axios = require('axios');
const express = require('express');
const app = express();

const TO_NAME = 1;
const TO_ABBREVIATED = 2;
const VALIDATE_ABBREVIATED = 3;

const FAILBOAT = 'No matching state found for requested code';

var server = app.listen(4000, ()=> {
    console.log("Server is online.");
});

/* Starts the service. */
app.get('/', function(req, res) {
    res.status(200).send('This is the main resource.');
})

/* 
Obligatory off switch :).
This isn't something I'd normally ever include as part of a system under development, 
but since the requirements called for an off switch..
That being said, this would likely be removed if I get around to building a front-end for this.
*/
app.get('/off', function(req, res) {
    server.close();
});

// // /// Main method - returns all state information by calling upon state API.
// app.get('/ByStateAbbrev/:abbrev', function (req, res){
//     axios.get('http://services.groupkt.com/state/get/USA/' + req.param('abbrev'))
//     .then(response => {
//         res.send(response.data);
//         console.log(req.params);
//     })
//     .catch(err => {
//         res.send({err});
//     });
// });

/*
Model UI.
            `
                <div>
                <h1>Search Results for : ` + req.params.abbrev + `</h1>
                <p id="result">Largest City: 
                    <strong id="largest">` + response.RestResponse.result.largest_city + ` </strong></p>
                <p id="result">Capital City: 
                    <strong id="capital">` + response.RestResponse.result.capital + ` </strong></p>
                </div>
                <style>
                #result {
                    background-color: white;
                    color: black;
                    padding:5px;
                    text-align:left;
                }
                #largest, #capital {
                    color: blue;
                }
                </style>
            `
*/

/* Main method - returns all state information by calling upon state API.
It even comes with a low-end UI.    
(No one has ever accused me of being a front-end developer).
*/
app.get('/ByState/:state', ((req, res) => {
    validator(req.params.state)
    .then(matchState)
    .then(executeRequest)
    .then(response => {
        res.send(response.RestResponse);
        console.log(req.params);
    })
    .catch(err => {
        res.status(404).json({err});
    });
}));

/* Executes the request using fully-qualified data.
*/
var executeRequest = (url) => {
    var promise = new Promise(function(resolve, reject){
        axios.get('http://services.groupkt.com/state/get/USA/' + url)
        .then(response => {
            console.log(response.data.RestResponse.result);
            resolve(response.data);
        })
        .catch(err => {
            console.log(err.message);
            reject({err});
        });
    });
    return promise;
};

/*
Validates the URL for valid state abbreviation. 
If it finds what it thinks is a state name, it will attempt to call
upon state matching method, which will ultimately determine if we're 
cooking with gas or not.
*/
var validator = (url) => {
    var promise = new Promise(function(resolve, reject) {
        if(/^[a-zA-Z\s]+$/.test(url)){
            resolve(url);
        } else {
            reject(FAILBOAT + ' ' + url);
        }
    });
    return promise;
};

/*
In the case of a non-state abbreviation, attempts to match 
the given string with the name of known state or territory.
if found, resolves with state / territory abbreviation.
if not found, rejects with fault message tbd.
If I had more time, I'd spin this off as its own micro-service.
*/
var matchState = (url) => {
    var promise = new Promise(function(resolve, reject) {
        let abbVal = abbrState(url, VALIDATE_ABBREVIATED);
        if(abbVal != null){
            console.log('Validate Abbreviated: ' + abbVal);
            resolve(abbVal);
        } else {
            let outVal = abbrState(url, TO_ABBREVIATED)
            console.log("Derived State Abbrev: " + outVal);
            if(outVal != null) {
                resolve(outVal);
            } else {
                reject(FAILBOAT + ' ' + url);
            }
        }
    });
    return promise;
};

/*
I found this, which is great because I don't have to write this on my
own: https://gist.github.com/calebgrove/c285a9510948b633aa47.
As US regions are not supported by the test API, I have removed them from
the list I gleefully copied from the aforementioned source.
I did add an additional operation by validating the input string. The idea is that we want to allow for mixed case input strings.
*/
function abbrState(input, to) {
    var states = [
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['American Samoa', 'AS'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['District Of Columbia', 'DC'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Guam', 'GU'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Northern Mariana Islands', 'MP'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Puerto Rico', 'PR'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['US Virgin Islands', 'VI'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    var i; 
    if (to == TO_ABBREVIATED) {
        input = input.replace(
            /\w\S*/g, function (txt) 
            { 
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); 
            }
        );
        for (i = 0; i < states.length; i++) {
            if (states[i][0] == input) {
                return (states[i][1]);
            }
        }
    } else if (to == TO_NAME) {
        input = input.toUpperCase();
        for (i = 0; i < states.length; i++) {
            if (states[i][1] == input) {
                return (states[i][0]);
            }
        }
    } else if (to == VALIDATE_ABBREVIATED) {
        input = input.toUpperCase();
        for (i = 0; i < states.length; i++) {
            if (states[i][1] == input) {
                return (states[i][1]);
            }
        }
    }
}