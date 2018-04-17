import React, { Component } from "react";
import { connect } from "react-redux";
import Rectangle from "../Components/Rectangle";
import { swapItem, compareItem, setPivot } from "../Actions/ListActions";

class DrawBoard extends Component {
  render() {
    const data = [];
    const list = this.props.data.collection.list;
    const status = this.props.data.mode;
    console.log("Subesh callsed");
    list.forEach((val, index) => {
      let mode = -1;
      if (status.SWAP.findIndex(val1 => index == val1) !== -1) mode = 1;
      else if(status.COMPARE.findIndex(val1 => index == val1) !== -1) mode = 2;
      data.push(
        <Rectangle key={index} mode={mode} pos={index} height={val.height} />
      );
    });

    return (
      <svg
        width="100%"
        viewBox="0 0 1100 550"
        style={{ background: "black" }}
        onClick={() => {
        
            setInterval( () => {
            let i = Math.floor(Math.random() * 100);
            let j = Math.floor(Math.random() * 100);
            setTimeout(() => {
              this.props.compare(i, j);
            }, 500);
            setTimeout(() => {
              this.props.swap(i, j);
            }, 1000);
          
        },1500);
        }}
      >
        {data}
      </svg>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.listReducer
  };
};

const mapDispatchToProps = dispatch => ({
  swap(i, j) {
    dispatch(swapItem(i, j));
  },
  compare(i, j) {
    dispatch(compareItem(i, j));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(DrawBoard);
