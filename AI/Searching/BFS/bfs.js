class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
}

/**
 *
 *
 * @param {problem} problem
 * @returns {solution or failure}
 */
function bfs(problem) {
  let node = problem.initialState;
  let pathCost = 0;

  if (problem.goalTest(node)) return node;
  let frontier = [node];
  let explored = [];

  while (1) {
    if (frontier.length === 0) return -1;
    console.log(frontier);
    console.log();
    node = frontier.shift();
    explored.push(node);
    if (problem.goalTest(node)) {
        console.log(explored,frontier);
        return node;}

    for (let i = 0; i < node.children.length; i++) {
      let child = node.children[i];

      frontier.push(child);
    }
  }
}

let a = new Node("a");
let b = new Node("b");
let c = new Node("c");
let d = new Node("d");
let e = new Node("e");
let f = new Node("f");
let g = new Node("g");

a.children.push(b, c);
b.children.push(d, e);
c.children.push(f, g);

let problem = {
  initialState: a,
  goal: d,
  goalTest(node) {
    if (node.name == this.goal.name) return true;
    return false;
  }
};

console.log(bfs(problem));
