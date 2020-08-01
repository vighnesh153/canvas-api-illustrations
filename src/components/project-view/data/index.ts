import { connect } from "react-redux";
import { APP_STATE } from "src/redux-impl/store";

import Data from "./data";

const mapStateToProps = (state: APP_STATE) => {
  return {
    attrs: state.dataAttributes,
  };
};

export default connect(mapStateToProps)(Data);
