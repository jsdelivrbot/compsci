var clear = require("cli-clear");

let currentSecond = 0;

function refresh() {
    currentSecond++;    
    clear();
    console.log(currentSecond);
}

setInterval(refresh, 1000);
