export default class GraphController {
  constructor(graph, maxRow, maxCol) {
    this.type = graph.type;
    this.graph = graph;
    this.maxRow = maxRow;
    this.maxCol = maxCol;
  }
  set graph(graph) {
    if (this.type === 1)
      this._graph = {
        ...graph,
        nodes: graph.nodes.map(node => ({ ...node })),
        arcs: graph.arcs.map(arc => ({ ...arc }))
      };
    else this._graph = graph.map(node => ({ ...node }));
  }
  get graph() {
    if (this.type === 1)
      return {
        ...this._graph,
        nodes: this._graph.nodes.map(node => ({ ...node })),
        arcs: this._graph.arcs.map(arc => ({ ...arc }))
      };
    else return this._graph.map(node => ({ ...node }));
  }
  getAdjacent(node, diagonal = false) {
    if (this.type === 0) {
      return this.getAdjacentOne(node, diagonal);
    } else {
      return this.getAdjacentTwo(node);
    }
  }

  getAdjacentOne(node, diagonal = false) {
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

  getAdjacentTwo(node) {
    let arr = [];
    this._graph.arcs.forEach(arc => {
      if (arc.from === node.pos) {
        arr.push(arc.to);
      } else if (arc.to === node.pos && this._graph.arcMode === 0) {
        arr.push(arc.from);
      }
      console.log("subesh",this._graph.arcMode);
    });
    console.log(arr);
    return arr
      .map(pos => {
        return this.at(pos);
      })
      .sort( (a, b) => a.x >= b.x);
  }

  at(pos) {
    if (this.type === 0) {
      let { i, j } = pos;
      pos = i * this.maxCol + j;
      if (pos >= this._graph.length)
        throw new TypeError(`No Node Found of ${i},${j}`);
      return this._graph[pos];
    } else {
      return this._graph.nodes[pos];

    }
  }
}
