import React, { Component } from "react";

export default class Node extends Component {

  render() {
    return (
      <circle
        cx={this.props.cx}
        cy={this.props.cy}
        r="40"
        stroke="black"
        fill="white"
        strokeWidth="2"
        style={{cursor:"pointer"}}
        onMouseDown={()=>this.props.setDrag(this.props.index)}
      />
    );
  }
}
