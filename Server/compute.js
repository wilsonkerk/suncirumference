/* This file intentionally created to handle the calculation and the api request different threads to avoid server too busy to handle API request while processing the calculation. */

const { computePIUsingChudnovsky, computePiUsingLeibniz, computePiUsingNilakantha, printCalculatedResult } = require('./pi.js')
const { savePIToFile } = require('./utils.js')
const { workerData, parentPort } = require('worker_threads')

var digit = 1;
var iteration = 1;
var delayInMilliseconds = 500; //0.01 second

// Function to calculate PI value and will keep looping after computePI done the job.
async function calculatingPI() {
    parentPort.postMessage('worker thread start');
    let startTime = performance.now()
        //const piValue = await computePIUsingChudnovsky(digit); // Chudnovsky algorithm method
        //const piValue = await computePiUsingLeibniz(iteration, digit); // Leibniz series method
    const piValue = await computePiUsingNilakantha(iteration, digit); // Nilakantha series method

    let endTime = performance.now()

    printCalculatedResult(piValue, Math.PI, startTime, endTime);

    var length = (piValue + '').replace('.', '').length; // for floats

    savePIToFile(__dirname + '/pi.txt', piValue, length);

    //limit to how many digits to stop calculation
    //if (digit >= 50) { return }; 

    // Calculation for next incremented digit
    digit += 1;
    iteration += 50

    // Set delay to start next calculation.
    setTimeout(function() {
        calculatingPI();
    }, delayInMilliseconds);


}

calculatingPI()