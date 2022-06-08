# Find circimference of sun via calculate PI

**Calculates PI using [Nilakantha series](https://en.wikipedia.org/wiki/Pi)**. This demo project serve the purpose of calculate the circumference of sun, which need to calculate PI value first in order to do so. The challenging part of this project is which formula I going to choose especially increasing 1 digit per calculation, because not all formula capable to achieve that. For example Nilakantha series and Leibniz series are calculate base on number of iterations, the more iterations the more accurate compare to published value.

## Table of Contents

1. [Run Server](#run)
2. [Options](#options)
3. [Examples](#examples)
4. [Run Webapp](#runwebapp)


## Run Server
   Server used Node.js to calculationg the PI Value and handle get request to pass the calculated value to frontend.
   
   To install the dependencies..
```bash
npm install
```
To run the server..
```bash
node index.js
```

### Options
    Inside Server folder -> compute.js -> js code line #15 to #17 you can choose other PI calculation method (Defaulted Nilakantha series).
    Feel free to try it out!
    
    //const piValue = await computePIUsingChudnovsky(digit); // Chudnovsky algorithm method
    //const piValue = await computePiUsingLeibniz(iteration, digit); // Leibniz series method
    const piValue = await computePiUsingNilakantha(iteration, digit); // Nilakantha series method

### Examples
```bash
$ node index.js

****************************************************************
myPI        : 3.14159265412479582479932105343323
Math.PI     : 3.141592653589793
The Diff    : -5.350027088013576e-10
Execution time: 0.00025837500020861625 seconds
Configuration saved successfully.
****************************************************************
```

## Run Webapp
The webapp was written in React Native, which support Native iOS, Android and Web. It's serve the purpose of getting PI value from calling Get API of server which store the latest PI value and define the circumference of sun. 

I using expo framework so need to install expo
```bash
npm install --global expo-cli
```
 To install the dependencies..
```bash
npm install
```
Start the Webapp and assuming iOS and Adroid simulator are installed and server is running then voila!
```bash
npm start 
or 
expo start
```

## Thoughts
From this project I learned a lot especially gaining more experience on full stack development such as create a server and react native. Also it's interestingly fun to know there are many way to calculate PI and who knows that update to date record-breaking 62.8 trillion digits was calculated according to [numberworld.org](http://www.numberworld.org/y-cruncher/)**. In future may dive into other formula such as Chudnovsky algorithm.
