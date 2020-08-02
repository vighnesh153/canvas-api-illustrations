import { Dispatch } from "redux";
import { connect } from "react-redux";

import DataAttributes from "src/models/data-attributes";
import { setDataAttributes } from "src/redux-impl/data-attributes/actions";

import Component from "./component";

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setDataAttributes: (v: DataAttributes) => dispatch(setDataAttributes(v)),
  };
}

export default connect(null, mapDispatchToProps)(Component);
