console.log(factorial(6));

function factorial(x) {
    if (x === 1) {
        return 1;
    } else {
        return x * factorial(x-1);
    }
}