// This script returns actions for each algorithm whenever a corresponding
// function is called.

import BubbleSort from "./bubble-sort";
import SelectionSort from "./selection-sort";
import QuickSort from "./quick-sort";
import MergeSort from "./merge-sort";
import HeapSort from "./heap-sort";

export const bubbleSort = list => {
  let sort = new BubbleSort(list);
  return sort.sort(compare());
};
export const selectionSort = list => {
  let sort = new SelectionSort(list);
  return sort.sort(compare());
};
export const quickSort = list => {
  let sort = new QuickSort(list);
  return sort.sort(compare());
};
export const mergeSort = list => {
  let sort = new MergeSort(list);
  return sort.sort(value());
};
export const heapSort = list => {
  let sort = new HeapSort(list);
  return sort.sort(value());
}

function compare() {
  return (i,j) => {
    return i.height >= j.height;
  }
}

function value() {
  return i => {
    return i.height;
  }
}