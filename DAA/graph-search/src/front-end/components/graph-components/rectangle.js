import React, { Component } from "react";


export default class Rectangle extends Component {
  

  render() {
    let props = this.props;
    return (
      <g>
        <rect
          width="30"
          height="30"
          x={30 * props.j}
          y={30 * props.i}
          fill={props.color}
          stroke="grey"
          strokeWidth="0.5px"
        />
      </g>
    );
  }
}
