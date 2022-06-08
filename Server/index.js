const express = require('express');
const app = express();
var cors = require('cors')
const { getPIValueFromFile } = require('./utils.js')
const { Worker } = require('worker_threads')

app.use(express.json());
app.use(cors());

// API with Cross-Origin Resource Sharing allowed 
app.get('/api/pivalue', cors(), (req, res) => {
    var piValue = getPIValueFromFile(__dirname + '/pi.txt');
    console.log(piValue);
    res.send(piValue);
});

// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port %s....', port));

async function runService(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./compute.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        })
    })
}

async function run() {
    const result = await runService()
    console.log(result);
}

run().catch(err => console.error(err))