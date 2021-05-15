import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk]

const middlewareObj = process.env.NODE_ENV === 'prodcution' 
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware))

const store = createStore(
    rootReducer,
    initialState,
    middlewareObj
);

export default store;