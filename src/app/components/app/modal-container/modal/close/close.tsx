import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as styles from './close.scss';
import { ResultAction } from 'checkout/actions/result-action';
import { Icon, IconType } from 'checkout/components/ui';
import { setResult } from 'checkout/actions';
import { ResultState } from 'checkout/state';

interface CloseProps {
    setResult: (resultState: ResultState) => ResultAction;
}

const mapDispatchToProps = (dispatch: Dispatch<ResultAction>) => ({
    setResult: bindActionCreators(setResult, dispatch)
});

const CloseDef: React.SFC<CloseProps> = (props) => (
    <div className={styles.close} onClick={props.setResult.bind(null, ResultState.close)}>
        <Icon icon={IconType.cross} />
    </div>
);

export const Close = connect(
    null,
    mapDispatchToProps
)(CloseDef);
