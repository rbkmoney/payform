import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as styles from './close.scss';
import { close } from '../../../../../actions/result-action';
import { ResultAction } from '../../../../../actions/result-action/result-action';
import { Icon } from '../../../../ui/icon';
import {IconType} from '../../../../ui/icon/icon-type';

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
