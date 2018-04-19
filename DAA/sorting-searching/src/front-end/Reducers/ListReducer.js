import List from "../../back-end/list";
let heights = Array(100)
  .fill(1)
  .map((val, index) => val * index);

console.log(heights);
let temp = [];
for (let i = 1; i <= 100; i++) {
  temp.push({
    mode: -1,
    height: heights.splice(Math.floor(Math.random() * heights.length), 1)[0]
  });
}
const initial = {
  collection: new List(temp),
  mode: {
    SWAP: [-1, -1],
    PIVOT: -1,
    COMPARE: [-1, -1],
    CURSOR: -1,
    STORE:{}
    
  }
};

const ListReducer = (state = initial, action) => {
  switch (action.type) {
    //Rendering SWAP
    case "LIST_SWAP":
      state = { ...state };
      let i = action.payload.pop();
      let j = action.payload.pop();
      state.collection.swap(i, j);
      state.mode.SWAP = [i, j];
      return state;

    //Rendering COMPARE
    case "LIST_COMPARE":
      state = { ...state };
      i = action.payload.pop();
      j = action.payload.pop();
      state.mode.COMPARE = [i, j];
      state.mode.SWAP = [-1, -1];
      return state;

    //Rendering PIVOT
    case "LIST_SET_PIVOT":
      state = { ...state };
      state.mode.PIVOT = action.payload;
      return state;
    //Rendering PIVOT
    case "LIST_SET_CURSOR":
      state = { ...state };
      state.mode.CURSOR = action.payload;
      return state;
    case "LIST_STORE":
      state = {...state}
      state.collection.storeAt(action.payload.i,action.payload.val);
      state.mode.STORE = action.payload;
      return state;

    default:
      return state;
  }
};

export default ListReducer;
