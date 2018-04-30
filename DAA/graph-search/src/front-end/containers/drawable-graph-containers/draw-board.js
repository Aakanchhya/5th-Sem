import { connect } from "react-redux";
import MenuBar from "../../components/drawable-components/ui/menu";
import SettingsBar from "../../components/drawable-components/ui/settings-bar";
import ToolBar from "../../components/drawable-components/ui/tool-bar";
import React, { Component } from "react";
import Node from "../../components/drawable-components/Node";
import UndirectedArc from "../../components/drawable-components/UndirectedArc";
import DirectedArc from "../../components/drawable-components/DirectedArc";
import { setDragItem, moveDraggedItem } from "../../actions/drawable-actions";
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
              if (this.props.drawBoard.dragItem !== -1) this.props.move(e);
            }}
            onMouseUp={() => {
              if (this.props.drawBoard.dragItem !== -1) this.props.dragItem(-1);
            }}
          >
            {dat}
          </svg>
        </div>
      </div>
    );
  }

  getComponents(graph) {
    let dat = graph.arcs.map((arc, index) => {
      if (arc.mode) {
        return (
          <DirectedArc
            key={index}
            x1={graph.nodes[arc.from].x}
            y1={graph.nodes[arc.from].y}
            x2={graph.nodes[arc.to].x}
            y2={graph.nodes[arc.to].y}
          />
        );
      } else {
        return (
          <UndirectedArc
            key={index}
            x1={graph.nodes[arc.from].x}
            y1={graph.nodes[arc.from].y}
            x2={graph.nodes[arc.to].x}
            y2={graph.nodes[arc.to].y}
          />
        );
      }
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DrawableGraphContainer
);
