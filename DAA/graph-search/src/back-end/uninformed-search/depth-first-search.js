import GraphController from "../graph-contoller";

export default class DepthFirstSearch {
  constructor(graph, maxRow, maxCol) {
    this._graph = new GraphController(graph, maxRow, maxCol);
  }
  search(initial, goal, diagonal = false, steps = 2) {
    let start = this._graph.at(initial.i, initial.j);
    console.log(start);
    this.store = [];
    start.color = "grey";
    start.predecessor = undefined;
    start.d = 0;
    // let final = undefined;
    // let queue = [start];
    // let prevD = 0;
   
    this.dfs(start,diagonal);

    return this.store;
  }

  dfs(u,diagonal) {
    u.color = "grey";
    this.store.push(this._graph.graph);
    for (let v of this._graph.getAdjacent(u,diagonal)) {
        if(v.color === "white") {
            v.predecessor = u;
            this.dfs(v,diagonal);

        }
    }
    u.color = "black";
    this.store.push(this._graph.graph);
  }
}
