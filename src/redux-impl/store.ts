import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import DataAttributesReducer from "./data-attributes/reducer";
import DataAttributes from "src/models/data-attributes";

import CurrentPageReducer from "./current-page/reducer";
import { CurrentPageStateType } from "./current-page/reducer";

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const rootReducer = combineReducers({
  dataAttributes: DataAttributesReducer,
  currentPage: CurrentPageReducer,
});

export type APP_STATE = {
  dataAttributes: DataAttributes;
  currentPage: CurrentPageStateType;
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);
export default store;
