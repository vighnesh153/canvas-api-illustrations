import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import DataAttributesReducer from "./data-attributes/reducer";
import DataAttributes from "src/models/data-attributes";

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const rootReducer = combineReducers({
  dataAttributes: DataAttributesReducer,
});

export type APP_STATE = {
  dataAttributes: DataAttributes;
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);
export default store;
