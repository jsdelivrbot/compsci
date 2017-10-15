console.log(factorial(6));

function factorial(numToFactor) {
    let accumulatedAnswer = 1;    
    while (numToFactor !== 1) {
        accumulatedAnswer *= numToFactor;
        numToFactor--;
    }
    return accumulatedAnswer;
}