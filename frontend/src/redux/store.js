import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';

import reducer from "./reducers";

const middlewares = [logger,thunk];

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;