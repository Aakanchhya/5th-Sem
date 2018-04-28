let graph = [];
let maxRow= 20;
  let maxCol= 40;
for (let i = 0; i < maxRow; i++) {
  
  for (let j = 0; j < maxCol; j++) {
    graph.push({
      predecessor: undefined,
      pos: { i, j },
      color: "white",
      d:Infinity
    });
  }
}

let initialState = {
  graph,
  maxRow,
  maxCol,
  initial:{
    i:10,
    j:10
  },
  goal:{
    i:13,
    j:24
  }
};
 const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GRAPH_SET_LIST":
      state = {...state};
      state.graph = action.payload;
      return state;
    default:
      return state;
  }
};
export default graphReducer;