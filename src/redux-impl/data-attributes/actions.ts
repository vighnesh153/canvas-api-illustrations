import { SET_DATA_ATTRIBUTES } from "./action-types";
import DataAttributes from "src/models/data-attributes";

export function setDataAttributes(dataAttributes: DataAttributes) {
  return {
    type: SET_DATA_ATTRIBUTES,
    payload: dataAttributes,
  };
}
