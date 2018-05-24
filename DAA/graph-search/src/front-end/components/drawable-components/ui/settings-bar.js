import React, { Component } from "react";
import { connect } from "react-redux";
import Node from "../Node";
import Arc from "../arc";
class SettingsBar extends Component {
  render() {
    const { graph, selectedItems, mode } = this.props.drawBoard;
    console.log(selectedItems.length);
    return (
      <div className="col-12 col-lg-2 bg-light">
        <h5>Node/Arc Settings</h5>
        {mode === 0 &&
          selectedItems.length > 0 &&
          (selectedItems[0].type === "Node" ? (
            <NodeSettings graph={graph} selectedItems={selectedItems}/>
          ) : (
            <ArcSettings graph={graph} selectedItems={selectedItems}/>
          ))}
      </div>
    );
  }
}

const  NodeSettings = ({selectedItems,graph}) => {
    const name = selectedItems[0].pos
    return (
      <div>
        <svg viewBox="0 0 200 200" width="100%" height="200">
          <Node cx={100} cy={100} color="white" name={name}/>
        </svg>

        <div className="container">
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" className="form-control" value={name}/>
          </div>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
              onChange={() => {}}
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Start
            </label>
          </div>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck2"
              onChange={() => {}}
            />
            <label className="custom-control-label" htmlFor="customCheck2">
              Goal
            </label>
          </div>
          <button className="btn btn-danger mt-4">Delete</button>
        </div>
      </div>
    );
  
}

class ArcSettings extends Component {
  render() {
    return (
      <div>
        <svg viewBox="0 0 200 200" width="100%" height="200">
          <Arc x1={50} y1={50} x2={150} y2={150} arcMode={1} />
        </svg>
        <div className="container">
          <div className="form-group row">
            <label htmlFor="from" className="col-5">
              From{" "}
            </label>
            <input
              type="text"
              name="from"
              id="from"
              className="form-control col-6"
              disabled
            />
          </div>
          <div className="form-group row">
            <label htmlFor="to" className="col-5">
              To{" "}
            </label>
            <input
              type="text"
              name="to"
              id="to"
              className="form-control col-6"
              disabled
            />
          </div>
          <button className="btn btn-danger mt-4">Delete</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  drawBoard: state.movableReducer
});

const mapDispatchToProps = dispatch => ({
  call() {}
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsBar);
