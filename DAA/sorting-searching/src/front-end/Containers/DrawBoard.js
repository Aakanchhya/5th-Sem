import React, { Component } from "react";
import { connect } from "react-redux";
import Rectangle from "../Components/Rectangle";
import {
  swapItem,
  compareItem,
  storeItem,
  setPivot,
  setBoundary,
  completeList
} from "../Actions/ListActions";
import {
  bubbleSort,
  mergeSort,
  quickSort,
  selectionSort,
  heapSort
} from "../../back-end/sort-algo";

class DrawBoard extends Component {
  render() {
    const data = [];
    const list = this.props.data.collection.list;
    const status = this.props.data.mode;
    list.forEach((val, index) => {
      let mode = -1;
      if (status.COMPLETE === 1) mode = 5;
      else if (status.SWAP.findIndex(val1 => index === val1) !== -1) mode = 1;
      else if (status.COMPARE.findIndex(val1 => index === val1) !== -1)
        mode = 3;
      else if (status.PIVOT === index) mode = 2;
      else if (status.CURSOR === index) mode = 4;
      else if (status.STORE.i && status.STORE.i === index) mode = 1;
      else if (status.BOUNDARY.findIndex(val1 => val1 === index) !== -1)
        mode = 4;
      data.push(
        <Rectangle key={index} mode={mode} pos={index} height={val.height} />
      );
    });

    return (
      <svg
        viewBox=" 0 0 1070 900"
        style={{ background: "black" }}
        onClick={() => {
          this.sortRender();
        }}
      >
        {data}
      </svg>
    );
  }

  async sortRender() {
    let action = heapSort(this.props.data.collection.list);

    console.log(action.length);

    for (let val of action) {
      await new Promise(resolve => {
        setTimeout(() => {
          this.performAction(val);
          resolve();
        }, 100);
      });
    }
  }

  performAction(action) {
    switch (action.type) {
      case "LIST_COMPARE":
        this.props.compare(action.payload.pop(), action.payload.pop());
        break;
      case "LIST_SWAP":
        this.props.swap(action.payload.pop(), action.payload.pop());
        break;
      case "LIST_STORE":
        this.props.store(action.payload.i, action.payload.val);
        break;
      case "LIST_SET_PIVOT":
        this.props.pivot(action.payload);
        break;
      case "LIST_BOUNDARY":
        this.props.boundary(action.payload.pop(), action.payload.pop());
      case "LIST_COMPLETE":
        this.props.complete(action.payload);
      default:
        break;
    }
  }
}

const mapStateToProps = state => {
  return { data: state.listReducer };
};

const mapDispatchToProps = dispatch => ({
  swap(i, j) {
    dispatch(swapItem(i, j));
  },
  compare(i, j) {
    dispatch(compareItem(i, j));
  },
  store(i, val) {
    dispatch(storeItem(i, val));
  },
  pivot(i) {
    dispatch(setPivot(i));
  },
  boundary(i, j) {
    dispatch(setBoundary(i, j));
  },
  complete(val) {
    dispatch(completeList(val));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(DrawBoard);
