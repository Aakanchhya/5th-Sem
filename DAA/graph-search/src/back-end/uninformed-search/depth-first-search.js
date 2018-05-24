import GraphController from "../graph-contoller";

export default class DepthFirstSearch {
  constructor(graph, maxRow, maxCol) {
    this._graph = new GraphController(graph, maxRow, maxCol);
  }
  search(initial, goal, diagonal = false, steps = 2) {
    let start = this._graph.at(initial);
    console.log(start);
    this.store = [];
    start.predecessor = undefined;
    start.d = 0;
    // let final = undefined;
    // let queue = [start];
    // let prevD = 0;
    this.dfs(start);

    return this.store;
  }

  dfs(u) {
    u.color = "Gainsboro";
    this.store.push(this._graph.graph);
    for (let v of this._graph.getAdjacent(u)) {
        if(v.color === "white") {
            v.predecessor = u;
            this.dfs(v);

        }
    }
    u.color = "lightcyan";
    this.store.push(this._graph.graph);
  }
}
