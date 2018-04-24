import List from "./list.js";

export default class OrderStatistics {
  constructor(list) { this._list = new List([...list]); }

  search(i) {
    let length = this._list.list.length;

    return this.randomSelect(0, length - 1, i);
  }

  randomSelect(p, r, i) {
    if (p === r) return this._list.at(p);
    let q = this.partition(p, r);
    console.log(this._list.list);
    let k = q-p+1;
    if (i === k)
      return this._list.at(q);
    else if (i < k) 
      return this.randomSelect(p, q - 1, i);
    else
      return this.randomSelect(q + 1, r, i-k);
  }

  randomPartition(p, r) {
    let k = Math.floor(Math.random() * (Math.abs(p - r) + 1)) + Math.min(p, r);
    this._list.swap(k, r);
    return this.partition(p, r)
  }


  partition(p, r) {
    let x = this._list.at(r);
    let i = p - 1;
    for (let j = p; j < r; j++) {
      if (x >= this._list.at(j)) {
        i++;

        this._list.swap(i, j);
      }
    }
    i++;
    this._list.swap(i, r);


    return i;
  }
}