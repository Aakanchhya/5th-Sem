function getCode(table, value) {
  let next = table.find(val => val.name === value);
  let code = "";
  while (next != undefined) {
    if (next.value !== undefined) code = next.value + code;
    next = next.parent;
  }
  return code;
}

function fromCode(root, code) {
  code = Array.from(code);
  let current = root;
  let string = "";
  while (code.length) {
    let str = code.shift();
    current = str === "0" ? current.left : current.right;
    if (!current.left) {
      string += current.name;
      current = root;
    }
  }
  return string;
}
function hoffmanEncoding(string) {
  let set = new Set(string);
  let frequencyTable =
    string instanceof Array
      ? string
      : Array.from(set).map(item => ({
          name: item,
          count: string.match(new RegExp(item, "g")).length
        }));

  let nodeTable = [...frequencyTable].sort((a, b) => a.count > b.count);
  let allNode = [];
  while (nodeTable.length !== 1) {
    let left = nodeTable.shift();
    let right = nodeTable.shift();
    let parent = {
      name: left.name + right.name,
      count: left.count + right.count,
      left,
      right
    };
    left.value = 0;
    right.value = 1;
    left["parent"] = parent;
    right["parent"] = parent;
    nodeTable.push(parent);
    nodeTable.sort((a, b) => a.count > b.count);
    allNode.push(left, right);
  }
  let final = frequencyTable.map(val => ({
    ...val,
    code: getCode(allNode, val.name)
  }));
  // console.log(final);
  // console.log(final.find(a => "A" === a.name));
  if( string instanceof Array)
    return final;
  let code = Array.from(string).reduce(
    (acc, val) => acc + final.find(a => val === a.name).code,
    ""
  );
  console.log(code);
  return fromCode(nodeTable[0], code);
}

console.log(hoffmanEncoding([
  {name:"C",count:32},
  {name:"D",count:42},
  {name:"E",count:120},
  {name:"K",count:7},
  {name:"L",count:42},
  {name:"M",count:24},
  {name:"U",count:37},
  {name:"Z",count:2},
]
)); 
