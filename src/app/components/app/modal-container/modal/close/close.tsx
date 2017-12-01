import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as styles from './close.scss';
import { close, ResultAction } from 'checkout/actions/result-action';
import { Icon, IconType } from 'checkout/components/ui';

interface CloseProps {
    close: () => Dispatch<ResultAction>;
}

const mapDispatchToProps = (dispatch: Dispatch<ResultAction>) => ({
    close: bindActionCreators(close, dispatch)
});

const CloseDef: React.SFC<CloseProps> = (props) =>
    (
        <div className={styles.close} onClick={props.close}>
            <Icon icon={IconType.cross}/>
        </div>
    );

export const Close = connect(null, mapDispatchToProps)(CloseDef);
