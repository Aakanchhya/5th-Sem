import List from './list.js'
import BubbleSort from './bubble-sort.js';
import SelectionSort from './selection-sort.js';
import QuickSort from './quick-sort.js';
import MergeSort from './merge-sort.js';
import HeapSort from './heap-sort.js';

let list1 = new List();

list1.list = [1,4,2,6,5,2,1,2,212,12,12,3123,34,2435,46,2,1,123,1];



let bSort = new BubbleSort(list1.list);
let sSort = new SelectionSort(list1.list);
let qSort = new QuickSort (list1.list);
let mSort = new MergeSort (list1.list);
let hSort = new HeapSort(list1.list);
console.log(
    hSort.sort( (i) => {
    return i
}) 
)