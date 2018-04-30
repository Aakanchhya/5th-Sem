import React, { Component } from "react";

class Arc extends Component {
  render() {
    const { x1, x2, y1, y2 } = this.props;
    let dx = (x1+x2) / 2 ;
    let dy = (y1+y2) /2;
    let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    return (
      <g style={{ cursor: "pointer" }} onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if(this.props.mode === 0)
        this.props.setSelected(this.props.index)}
        }>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2"  strokeDasharray={this.props.isSelected?5:0}  />
        {
          this.props.arcMode &&
        <path
          d={`M${dx+10},${dy} L${dx+2},${dy + 10} L${dx + 10},${dy} L${dx+2},${dy -
            10} z`}
          
          transform={`rotate(${angle},${dx},${dy})` }
          strokeWidth="2"
          stroke="black"
        />}
      </g>
    );
  }
}

export default Arc;
