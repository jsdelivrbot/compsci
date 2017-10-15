let Heap = require('heap');
let heap = new Heap();

console.log(sort([3,1,2]));

function sort(arrayToSort) {
    for (let i = 0; i < arrayToSort.length; i++) {
        heap.push(arrayToSort[i]);
    }
    let result = [];
    for (let i = 0; i < arrayToSort.length; i++) {
        result.push(heap.pop());
    }    
    return result;
}