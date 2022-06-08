const fs = require('fs')

exports.savePIToFile = function(path, pi, digit) {
    var piJSON = {
        value: pi,
        digit: digit
    };

    var data = JSON.stringify(piJSON);
    fs.writeFile(path, data, function(err) {
        if (err) {
            console.log('There has been an error saving your configuration data.');
            console.log(err.message);
            return;
        }
        console.log('Configuration saved successfully.')
    });
}

exports.getPIValueFromFile = function(path) {
    var data = fs.readFileSync(path),
        myObj;
    try {
        myObj = JSON.parse(data);
        console.log(myObj);
        console.dir(myObj);
    } catch (err) {
        console.log('There has been an error parsing your JSON.')
        console.log(err);
    }

    return (myObj);
}