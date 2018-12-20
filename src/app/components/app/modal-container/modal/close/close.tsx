import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as styles from './close.scss';
import { ResultAction } from 'checkout/actions/result-action';
import { setResult } from 'checkout/actions';
import { ResultState } from 'checkout/state';
import { Cross } from 'checkout/components';

interface CloseProps {
    setResult: (resultState: ResultState) => ResultAction;
}

const mapDispatchToProps = (dispatch: Dispatch<ResultAction>) => ({
    setResult: bindActionCreators(setResult, dispatch)
});

const CloseDef: React.FC<CloseProps> = (props) => (
    <div className={styles.close} onClick={props.setResult.bind(null, ResultState.close)}>
        <Cross />
    </div>
);

export const Close = connect(
    null,
    mapDispatchToProps
)(CloseDef);
