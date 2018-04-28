import GraphController from "../graph-contoller";

export default class BreadthFirstSearch {
  constructor(graph, maxRow, maxCol) {
    this._graph = new GraphController(graph, maxRow, maxCol);
  }

  search(initial, goal, diagonal = false, steps = 2) {
    let start = this._graph.at(initial.i, initial.j);
    console.log(start);
    let store = [];
    start.color = "grey";
    start.predecessor = undefined;
    start.d = 0;
    let final = undefined;
    let queue = [start];
    let prevD = 0;

    while (queue.length !== 0) {
      let u = queue.shift();
      if (u.pos.i === goal.i && u.pos.j === goal.j) {
        final = u;
        break;
      }
      for (let v of this._graph.getAdjacent(u,diagonal)) {
        if (v.color === "white") {
          v.color = "Gainsboro";
          v.predecessor = u;
          v.d = u.d + 1;
          queue.push(v);
        }
      }

      u.color = "lightcyan";
      prevD++;
      if (prevD === steps) {
        store.push(this._graph.graph);
        prevD = 0;
      }
    }
    if (store.length !== this._graph.graph.length)
      store.push(this._graph.graph);
    if (final) {
      let path = final.predecessor;
      while (path.predecessor) {
        path.color = "YellowGreen";
        path = path.predecessor;
      }
    }
    store.push(this._graph.graph);
    return store;
  }
}
