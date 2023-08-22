import { applyMiddleware, createStore, } from 'redux'
import { postReducer } from './post/postReducer'
import thunk from 'redux-thunk';

export const store = createStore(postReducer, applyMiddleware(thunk));