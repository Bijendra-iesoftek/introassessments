import { POST_FETCH, LOADING_POST, ADD_NODE, DELETE_NODE } from "./postType";

const initialState = {
    post: [],
    loading: false,
    treeData: [{
        id: 1,
        label: 'Main',
        children: []
    }]
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_FETCH:
            return { ...state, post: action.payload, loading: false }
        case LOADING_POST:
            return { ...state, loading: true }
        case ADD_NODE:
            const { nodeId, newNode } = action.payload;
            const updatedTreeData = state.treeData.map(node => {
                if (node.id == nodeId) {
                    return {
                        ...node,
                        children: [...node.children, newNode]
                    };
                }
                return node;
            });
            return {
                ...state,
                treeData: updatedTreeData
            };
        case DELETE_NODE:
            const { nodeId: deleteNodeId, nodeName } = action.payload;
            const updatedTreeDataDelete = state.treeData.map(node => {
                if (node.id == deleteNodeId) {
                    return {
                        ...node,
                        children: node.children.filter(child => child.label !== nodeName)
                    };
                }
                return node;
            });
            return {
                ...state,
                treeData: updatedTreeDataDelete
            };
        default:
            return state;
    }
}
