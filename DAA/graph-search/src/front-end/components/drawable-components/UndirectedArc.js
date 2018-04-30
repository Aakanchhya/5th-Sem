import React, { Component } from "react";

export default class UndirectedArc extends Component {
  render() {
    const { x1, x2, y1, y2 } = this.props;
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2" strokeDasharray={this.props.isSelected?5:0}  />;
  }
}
