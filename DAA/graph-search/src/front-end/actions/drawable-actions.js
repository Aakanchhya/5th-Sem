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