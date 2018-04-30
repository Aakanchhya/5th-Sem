import React, { Component } from "react";

class DirectedArc extends Component {
  render() {
    const { x1, x2, y1, y2 } = this.props;
    let dx = (x1+x2) /2;
    let dy = (y1+y2) /2;
    let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    return (
      <g style={{ cursor: "pointer" }}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2" />
        <path
          d={`M${dx},${dy} L${dx},${dy + 10} L${dx + 10},${dy} L${dx},${dy -
            10} `}
          fill="black"
          transform={`rotate(${angle},${dx},${dy})`}
        />
      </g>
    );
  }
}

export default DirectedArc;
