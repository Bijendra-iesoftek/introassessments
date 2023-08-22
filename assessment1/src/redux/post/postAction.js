import axios from 'axios';
import { POST_FETCH, LOADING_POST, ADD_NODE, DELETE_NODE } from './postType';

export const fetchPost = (payload) => {
    return {
        type: POST_FETCH,
        payload,
    }
}

export const loadingPost = () => {
    return {
        type: LOADING_POST
    }
}

export const addNode = (nodeId, newNode) => ({
    type: ADD_NODE,
    payload: { nodeId, newNode },
  });
  
  export const deleteNode = (nodeId, nodeName) => ({
    type: DELETE_NODE,
    payload: { nodeId, nodeName },
  });

export const fetchPostMiddleware = () => {
    return (dispatch) => {
        dispatch(loadingPost()); 
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then((response) => {
                    dispatch(fetchPost(response.data));
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                });
    };
}

export const addNodeMiddleware = (nodeId, newNode) => {
    return (dispatch) => {
        dispatch(addNode(nodeId, newNode));
    }
}

export const deleteNodeMiddleware = (nodeId, nodeName) => {
    return (dispatch) => {
        dispatch(deleteNode(nodeId, nodeName));
    }
}


