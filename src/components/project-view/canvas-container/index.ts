import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import CanvasContainer from './canvas-container';

import { APP_STATE } from 'src/redux-impl/store';

const mapStateToProps = (state: APP_STATE) => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);
