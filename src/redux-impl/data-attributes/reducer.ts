import DataAttributes from "src/models/data-attributes";
import { SET_DATA_ATTRIBUTES } from "./action-types";

const initialState: DataAttributes = {};

export default (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_DATA_ATTRIBUTES:
      return action.payload as DataAttributes;
    default:
      return state;
  }
};
