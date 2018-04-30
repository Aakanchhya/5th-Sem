let initialMove = {
  graph: {
    type: 1,
    nodes: [],
    arcs: [],

    arcMode: 0
  },
  start: 0,
  goal: 1,
  selectedItems: [],
  dragItem: -1,
  stack: [],
  mode: 0,
  algo: 0,
  scale: 1
};
export const movableReducer = (state = initialMove, action) => {
  switch (action.type) {
    case "MOVABLE_NODE_MOVE":
      state = { ...state };
      let offset = getOffSet(action.payload,state.scale);
      state.graph.nodes[state.dragItem].x = offset.offsetX;
      state.graph.nodes[state.dragItem].y = offset.offsetY;
      return state;

    case "MOVABLE_SET_DRAG":
      state = { ...state };
      state.dragItem = action.payload;
      if (state.dragItem !== -1)
        state.selectedItems = [{ type: "Node", pos: action.payload }];
      return state;

    case "MOVABLE_CHANGE_MODE":
      if (state.mode === action.payload) return state;
      state = { ...state };
      if (state.mode === 3) state.graph.nodes.forEach(node => (node.color = "white"));
      state.mode = action.payload;
      state.selectedItems = [];
      return state;
    case "MOVABLE_SET_SELECTED":
      state = { ...state };
      if (action.payload !== -1) {
        if (state.mode === 0)
          state.selectedItems = [{ type: "Arc", pos: action.payload }];
        else if (state.mode === 2) {
          state.selectedItems.push({ type: "Node", pos: action.payload });
          if (state.selectedItems.length === 2) {
            if (state.selectedItems[0].pos !== state.selectedItems[1].pos)
              state.graph.arcs.push({
                from: state.selectedItems.shift().pos,
                to: state.selectedItems.shift().pos
              });
            else state.selectedItems = [];
          }
        }
      } else state.selectedItems = [];
      return state;
    case "MOVABLE_ADD_NODE":
      state = { ...state };
      offset = getOffSet(action.payload,state.scale);
      state.graph.nodes.push({
        x: offset.offsetX,
        y: offset.offsetY,
        color: "white",
        predecessor: undefined,
        d: 0,
        pos: state.graph.nodes.length
      });
      return state;
    case "MOVABLE_SET_GRAPH":
      state = { ...state };
      state.graph = action.payload;
      return state;
    case "MOVABLE_SET_SCALE":
      state = { ...state };
      state.scale += action.payload;
      return state;
    default:
      return state;
  }
};

function getOffSet(e,scale) {
  let rect = e.currentTarget.getBoundingClientRect();
  let clientX = e.clientX || e.touches[0].clientX;
  let clientY = e.clientY || e.touches[0].clientY;
  let offsetX = (clientX - rect.left)/scale;
  let offsetY = (clientY - rect.top)/scale;
  return { offsetX, offsetY };
}
