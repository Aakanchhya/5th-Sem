let initialMove = {
  graph: {
    nodes: [
      { x: 100, y: 100 },
      { x: 200, y: 200 },
      { x: 300, y: 200 },
      { x: 400, y: 200 },
      { x: 500, y: 200 },
      { x: 600, y: 200 },
      { x: 700, y: 200 },
      { x: 600, y: 300 }
    ],
    arcs: [
      { from: 0, to: 1, mode: 1 },
      { from: 1, to: 2, mode: 1 },
      { from: 2, to: 3, mode: 1 },
      { from: 3, to: 4, mode: 1 },
      { from: 4, to: 5, mode: 1 },
      { from: 5, to: 6, mode: 1 },
      { from: 5, to: 7, mode: 1 }
    ]
  },
  start: {},
  goal: {},
  selectedItem: undefined,
  dragItem: -1,
  stack: [],
  mode: 0,
  algo: 0
};
export const movableReducer = (state = initialMove, action) => {
  switch (action.type) {
    case "MOVABLE_NODE_MOVE":
      state = { ...state };
      let e = action.payload;
      let rect = e.currentTarget.getBoundingClientRect();
      let clientX = e.clientX || e.touches[0].clientX;
      let clientY = e.clientY || e.touches[0].clientY;
      let offsetX = clientX - rect.left;
      let offsetY = clientY - rect.top;
      state.graph.nodes[state.dragItem].x = offsetX;
      state.graph.nodes[state.dragItem].y = offsetY;
      return state;

    case "MOVABLE_SET_DRAG":
      state = { ...state };
      state.dragItem = action.payload;
      return state;

    case "MOVABLE_CHANGE_MODE":
    state= {...state};
    state.mode = action.payload;
    return state;

    default:
      return state;
  }
};
