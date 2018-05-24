import React, { Component } from "react";

export default class Node extends Component {
  render() {
    return (
      <g
        onMouseDown={e => {
          e.stopPropagation();
          e.preventDefault();
          if (this.props.mode === 0) this.props.setDrag(this.props.index);
          else if (this.props.mode === 2)
            this.props.setSelected(this.props.index);
        }}
      >
        <circle
          cx={this.props.cx}
          cy={this.props.cy}
          r="40"
          stroke="black"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          fill={this.props.color || "white"}
          strokeDasharray={this.props.isSelected ? 5 : 0}
        />
        <text x={this.props.cx-5} y={this.props.cy+5}  fontSize="20" cursor="pointer">
          {this.props.name}
        </text>
      </g>
    );
  }
}
