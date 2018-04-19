import React, { Component } from "react";
import { connect } from "react-redux";
import Rectangle from "../Components/Rectangle";
import { swapItem, compareItem, storeItem } from "../Actions/ListActions";
import BubbleSort from "../../back-end/bubble-sort";
import SelectionSort from "../../back-end/selection-sort";
import QuickSort from "../../back-end/quick-sort";
import MergeSort from "../../back-end/merge-sort";

class DrawBoard extends Component {
  render() {
    const data = [];
    const list = this.props.data.collection.list;
    const status = this.props.data.mode;
    list.forEach((val, index) => {
      let mode = -1;
      if (status.SWAP.findIndex(val1 => index === val1) !== -1) mode = 1;
      else if (status.COMPARE.findIndex(val1 => index === val1) !== -1) mode = 2;
      else if (status.PIVOT === index) mode = 3
      else if (status.CURSOR === index) mode = 4
      else if (status.STORE.i && status.STORE.i === index) mode = 5
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
    let bSort = new BubbleSort(this.props.data.collection.list);
    let sSort = new SelectionSort(this.props.data.collection.list);
    let qSort = new QuickSort (this.props.data.collection.list);
    let mSort = new MergeSort (this.props.data.collection.list);

    let action = mSort.sort( (i) =>{
        return i.height
    } );

    console.log(action.length);

    for (let val of action) {
      await new Promise(resolve => {
        setTimeout(() => {
          this.performAction(val);
          resolve();
        }, 1);
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
        this.props.store(action.payload.i,action.payload.val)
        break;
      default:
        break;
    }
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
  },
  store(i,val) {
    dispatch(storeItem(i,val))
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(DrawBoard);
