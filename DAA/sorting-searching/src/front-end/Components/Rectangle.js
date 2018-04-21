import React, { Component } from "react";

class Rectangle extends Component {
  render() {
    const { mode, pos, height } = this.props;

    let color = this.selectColor(mode);
    return (
      <g>
        <rect
          width="10"
          height={height * 5 + 5}
          x={pos * 10 + 10}
          y={505 - height * 5}
          style={{ fill: color, stroke: "black" }}
        />
      </g>
    );
  }

  selectColor(mode) {
    switch (mode) {
      //red - swap, store
      case 1:
        return "#ff364a";
      //blue - pivot
      case 2:
        return "#459dff";
      //yellow - compare
      case 3:
        return "#ff9fa8";
      //orange - boundary
      case 4:
        return "#ff9552";
      //green - complete
      case 5:
        return "#3ffc48";
      default:
        return "#ffffff";
    }
  }
}

export default Rectangle;
