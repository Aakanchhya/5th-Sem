export default class GraphController {
  constructor(graph, maxRow, maxCol) {
    this.graph = graph;
    this.maxRow = maxRow;
    this.maxCol = maxCol;
  }
  set graph(graph) {
    this._graph = graph.map(node => ({ ...node }));
  }
  get graph() {
    return this._graph.map(node => ({ ...node }));
  }
  getAdjacent(node, diagonal = false) {
    let { pos } = node;
    let arr = [
      { i: pos.i + 1, j: pos.j },
      { i: pos.i, j: pos.j + 1 },
      { i: pos.i - 1, j: pos.j },
      { i: pos.i, j: pos.j - 1 }
    ];
    if (diagonal) {
      arr.push(
        ...[
          { i: pos.i + 1, j: pos.j - 1 },
          { i: pos.i + 1, j: pos.j + 1 },
          { i: pos.i - 1, j: pos.j + 1 },
          { i: pos.i - 1, j: pos.j - 1 }
        ]
      );
    }
    return arr
      .filter(
        val =>
          val.i >= 0 &&
          val.i < this.maxRow &&
          (val.j >= 0 && val.j < this.maxCol)
      )
      .map(pos => this.at(pos.i, pos.j));
  }
  at(i, j) {
    let pos = i * this.maxCol + j;
    if (pos >= this._graph.length)
      throw new TypeError(`No Node Found of ${i},${j}`);
    return this._graph[pos];
  }
}
