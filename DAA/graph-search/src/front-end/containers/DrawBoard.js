import React, { Component } from "react";

import { connect } from "react-redux";
import Rectangle from "../components/graph-components/rectangle";
import { setList } from "../actions/graph-actions";
import BreadthFirstSearch from "../../back-end/uninformed-search/breadth-first-search";
// eslint-disable-next-line
import DepthFirstSearch from "../../back-end/uninformed-search/depth-first-search";
export class DrawBoard extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }
  
  async search() {
    const { graphData } = this.props;
    
    let search = new BreadthFirstSearch(
      graphData.graph,
      graphData.maxRow,
      graphData.maxCol
    );
    let list = search.search(graphData.initial, graphData.goal,false,5);
    console.log(list.length, list);
    for (let li of list) {
      await new Promise(resolve => {
        setTimeout(() => {
          this.props.changeList(li);
          resolve();
        }, 1);
      });
    }
  }
  render() {
    let s = [];
    const { graphData } = this.props;
    const { initial, goal } = graphData;
    graphData.graph.forEach((node, index) => {
      let color = false;
      if (goal.i === node.pos.i && goal.j === node.pos.j) color = "green";
      else if (initial.i === node.pos.i && initial.j === node.pos.j)
        color = "red";
      s.push(
        <Rectangle
          key={index}
          i={node.pos.i}
          j={node.pos.j}
          color={color ? color : node.color}
        />
      );
    });
    return (
      <svg viewBox="0 0 1300 700" onClick={this.search}>
        {" "}
        {s}{" "}
      </svg>
    );
  }
}
const mapStateToProps = state => ({ graphData: state.graphReducer });
const mapDispatchToProps = dispatch => ({
  changeList(list) {
    dispatch(setList(list));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(DrawBoard);
