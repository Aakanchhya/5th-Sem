console.clear();
const Box = x => ({
  map: f => Box(f(x)),
  chain: f => f(x),
  fold: f => f(x),
  inspect: f => `Box(${x})`
});

const item = [
  { w: 20, v: 10, p: 1 },
  { w: 5, v: 5, p: 2 },
  { w: 15, v: 5, p: 3 },
  { w: 5, v: 15, p: 4 }
];

const findDensity = x =>
  Box(x)
    .map(x => ({ ...x, d: x.v / x.w }))
    .fold(x => x);

const knapSack = (max, items) =>
  Box(items)
    .map(items => items.map(item => findDensity(item)))
    .map(items => items.sort((a, b) => a.d < b.d))
    .map(items => 
        items.reduce( (bag, item) => 
            bag.map( bag => bag && bag.cap > 0 ? { items: [ ...bag.items, item.w > bag.cap ? findDensity({ v: bag.cap / item.w * item.v, w: item.w - bag.cap }) : { ...item } ], cap: bag.cap - item.w } : bag ), Box({ items: [], cap: max }) ) )
    .chain(x => x)
    .map(x => x.items)
    .map(x => x.reduce((acc, v) => acc + v.v, 0))
    .fold(x => x);

console.log(item);
// const sortedItem = item.map(x => x.sort()).map(x => x.reverse());
console.log(knapSack(23, item));
