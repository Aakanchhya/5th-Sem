import { connect } from "react-redux";

import React, { Component } from "react";
import Node from "../../components/drawable-components/Node";
import BreadthFirstSearch from "../../../back-end/uninformed-search/breadth-first-search";
import Arc from "../../components/drawable-components/arc";
import {
  setDragItem,
  moveDraggedItem,
  setSelectedItem,
  addNode,
  setGraph,
  setScale
} from "../../actions/drawable-actions";
class DrawableGraphContainer extends Component {
  componentWillMount() {
    window.addEventListener("resize", () => this.setState({}));
  }
  render() {
    let dat = this.getComponents(this.props.drawBoard.graph);
    return (
      <div className="container-fluid col-12 col-lg-9 p-0 px-lg-2">
        <div
          style={{
            overflow: "scroll",
            height: window.innerHeight - window.innerHeight * 0.06
          }}
          className="container-fluid col-12"
        >
          <svg
            className="position-absolute"
            width="1000%"
            height="1000%"
            style={{
              background: "white",
              top: 0,
              left: 0
            }}
            onMouseMove={e => {
              if (
                this.props.drawBoard.mode === 0 &&
                this.props.drawBoard.dragItem !== -1
              )
                this.props.move(e);
            }}
            onMouseUp={() => {
              if (
                this.props.drawBoard.mode === 0 &&
                this.props.drawBoard.dragItem !== -1
              )
                this.props.dragItem(-1);
            }}
            onMouseDown={evt => {
              if (
                this.props.drawBoard.mode === 0 ||
                this.props.drawBoard.mode === 2
              )
                this.props.setSelected(-1);
              else if (this.props.drawBoard.mode === 1) this.props.newNode(evt);
            }}
            // onDoubleClick={this.search.bind(this)}
          >
            <g transform={`scale(${this.props.drawBoard.scale})`}>{dat}</g>
          </svg>
        </div>
        <div className=" position-absolute p-1" style={{ top: 0 }}>
          <div
            className="btn-group"
            hidden={this.props.drawBoard.selectedItems.length ? true : false}
          >
            <button
              className="btn btn-dark"
              onClick={() => {
                this.props.changeScale(0.05);
              }}
            >
              <i className="fa fa-plus" />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.props.changeScale(-0.05);
              }}
            >
              <i className="fa fa-minus" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  getComponents(graph) {
    let dat = graph.arcs.map((arc, index) => {
      return (
        <Arc
          key={index}
          index={index}
          x1={graph.nodes[arc.from].x}
          y1={graph.nodes[arc.from].y}
          x2={graph.nodes[arc.to].x}
          y2={graph.nodes[arc.to].y}
          arcMode={graph.arcMode}
          mode={this.props.drawBoard.mode}
          setSelected={this.props.setSelected}
          isSelected={
            this.props.drawBoard.selectedItems.findIndex(
              val => val.pos === index && val.type === "Arc"
            ) !== -1
          }
        />
      );
    });

    dat.push(
      graph.nodes.map((node, index) => {
        return (
          <Node
            cx={node.x}
            cy={node.y}
            key={index}
            setDrag={this.props.dragItem}
            move={this.move}
            index={index}
            mode={this.props.drawBoard.mode}
            color={node.color}
            name={node.pos}
            isSelected={
              this.props.drawBoard.selectedItems.findIndex(
                val => val.pos === index && val.type === "Node"
              ) !== -1
            }
            setSelected={this.props.setSelected}
          />
        );
      })
    );

    return dat;
  }

  
}

const mapStateToProps = state => ({
  drawBoard: state.movableReducer
});

const mapDispatchToProps = dispatch => ({
  dragItem(pos) {
    dispatch(setDragItem(pos));
  },
  move(evt) {
    dispatch(moveDraggedItem(evt));
  },
  setSelected(pos) {
    dispatch(setSelectedItem(pos));
  },
  newNode(evt) {
    dispatch(addNode(evt));
  },
  changeGraph(graph) {
    dispatch(setGraph(graph));
  },
  changeScale(scale) {
    dispatch(setScale(scale));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DrawableGraphContainer
);
