import React, { Component } from "react";
import { connect } from "react-redux";
import { changeMode, setGraph } from "../../../actions/drawable-actions";
import BreadthFirstSearch from "../../../../back-end/uninformed-search/breadth-first-search";
import DepthFirstSearch from "../../../../back-end/uninformed-search/depth-first-search";
const mapStateToProps = (state, ownProps) => ({
  drawBoard: state.movableReducer
});

const mapDispatchToProps = dispatch => ({
  setMode(mode) {
    dispatch(changeMode(mode));
  },
  changeGraph(graph) {
    dispatch(setGraph(graph));
  }
});

//const Variables
const stateSVG = (
  <circle cx="25" cy="25" r="20" stroke="black" strokeWidth="2" fill="White" />
);
const arcSVG = (
  <g>
    <path
      d="M 0 30 Q 25 10 50 30"
      stroke="black"
      fill="none"
      strokeWidth="2px"
    />
    <polygon
      transform="translate(20 20) scale(1.5)  translate(-20 -20)"
      points="25 20 20 15 20 25"
      stroke="black"
      fill="grey"
    />{" "}
  </g>
);
const selectSVG = (
  <g transform="scale(1.8)">
    <polygon
      xmlns="http://www.w3.org/2000/svg"
      points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 "
    />
    <rect
      xmlns="http://www.w3.org/2000/svg"
      x="12.5"
      y="13.6"
      transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)"
      width="2"
      height="8"
    />
  </g>
);

class ToolBar extends Component {
  render() {
    return (
      <div className="col-12 col-lg-1 container bg-light p-lg-2 p-xl-4">
        <ToolButton
          isActive={this.props.drawBoard.mode === 0}
          setMode={this.props.setMode}
          mode={0}
        >
          {selectSVG}
        </ToolButton>

        <ToolButton
          isActive={this.props.drawBoard.mode === 1}
          setMode={this.props.setMode}
          mode={1}
        >
          {stateSVG}
        </ToolButton>

        <ToolButton
          isActive={this.props.drawBoard.mode === 2}
          setMode={this.props.setMode}
          mode={2}
        >
          {arcSVG}
        </ToolButton>
        <ToolButton
          isActive={this.props.drawBoard.mode === 3}
          setMode={this.props.setMode}
          mode={3}
          extra={this.search.bind(this)}
        >
          <polygon
            xmlns="http://www.w3.org/2000/svg"
            points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 "
          />
        </ToolButton>
      </div>
    );
  }
  async search() {
    console.log(this.props);
    const { drawBoard } = this.props;

    let search = new DepthFirstSearch(drawBoard.graph);
    let list = search.search(drawBoard.start, drawBoard.goal, false, 1);
    console.log(list.length, list);
    for (let li of list) {
      await new Promise(resolve => {
        setTimeout(() => {
          this.props.changeGraph(li);
          resolve();
        }, 500);
      });
    }
  }
}

const ToolButton = props => {
  return (
    //selectable button
    <button
      className={`btn btn-light ${props.isActive ? "active" : " "}`}
      onClick={() => {
        if (!props.isActive) props.setMode(props.mode);
        if (props.extra) props.extra();
      }}
    >
      <svg
        version="1.1"
        baseProfile="full"
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
      >
        {props.children}
      </svg>
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
