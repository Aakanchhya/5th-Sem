export const setSelectedItem = (pos) => ({
    type: "MOVABLE_SET_SELECTED",
    payload:pos
})
export const setDragItem = (pos) => ({
    type: "MOVABLE_SET_DRAG",
    payload:pos
})

export const moveDraggedItem = (evt) => ({
    type: "MOVABLE_NODE_MOVE",
    payload:evt
})

export const changeMode = (mode) => ({
    type: "MOVABLE_CHANGE_MODE",
    payload:mode
});

export const addNode = (evt) => ({
    type: "MOVABLE_ADD_NODE",
    payload:evt
})

export const setGraph = (graph) =>({
    type: "MOVABLE_SET_GRAPH",
    payload:graph
})

export const setScale = (scale) => ({
    type: "MOVABLE_SET_SCALE",
    payload:scale
})