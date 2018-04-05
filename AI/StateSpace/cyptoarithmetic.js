let CryptArithSolver = {
  set: [],
  setVal: {},
  operands: [],
  setLength: 0,
  decrypt(...args) {

    this.set = new Set([]);
    args.forEach(val => {
      let arr = val.split("");
      arr.forEach(val => this.set.add(val));
      this.operands.push(arr.reverse());
    });
    this.set = [...this.set];
    this.setLength = this.set.length;
    let func = this.permutation.bind(this);
    let pr = new Promise((resolve, reject) => {
      setTimeout(() => {
        func(10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        resolve()
      }, 0)
    });
  },
  add(val1, val2) {
    let length = val1.length > val2.length ? val1.length : val2.length;
    let result = [];
    let carry = 0;
    for (let i = 0; i < length; i++) {
      let accumulator = carry + (val1[i] ? val1[i] : 0) + (val2[i] ? val2[i] : 0);
      carry = parseInt(accumulator / 10);
      result.push(accumulator % 10);
    }
    if (carry)
      result.push(carry);
    return result;
  },
  swap(arr1, a, b) {
    let arr = [...arr1];
    arr[a] ^= arr[b];
    arr[b] ^= arr[a];
    arr[a] ^= arr[b];
    return arr;
  },
  permutation(n, val) {
    if (n == 1) {
      return this.calculate(val);
    }
    let temp = [...val];
    if (this.permutation(n - 1, [...temp])) return 1;
    for (let i = n - 2; i >= 0; i--) {
      let newVal = this.swap(temp, n - 1, i);
      if (this.permutation(n - 1, newVal)) return 1;
    }
  },
  mapSetVals(arr) {
    return arr.map(val => {

      return this.setVal[val];
    });
  },
  calculate(val) {
    val = [...val].reverse();
    for (let i = 0; i < this.setLength; i++) {
      this.setVal[this.set[i]] = val[i];
    }
    let operand1 = this.mapSetVals(this.operands[0]);
    let operand2 = this.mapSetVals(this.operands[1]);
    let result = this.mapSetVals(this.operands[2]);
    let tempResult = this.add(operand1, operand2);
    if (tempResult.length === result.length) {
      let length = result.length;
      let same = true;
      for (let i = 0; i < length; i++) {
        if (tempResult[i] !== result[i]) {
          same = false;
          break;
        }
      }
      if (same) {
        console.table((this.setVal));
        return 1;
      }
    }
    return 0;
  }
};
CryptArithSolver.decrypt("RING", "DOOR", "BEEL")
// console.log(CryptArithSolver.add([1, 2, 3, 4], [1, 2, 3, 8]));