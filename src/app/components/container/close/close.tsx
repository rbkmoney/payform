import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as styles from './close.scss';
import { Icon } from '../../index';
import { close } from '../../../actions/result-action';
import { ResultAction } from '../../../actions/result-action/result-action';

interface CloseProps {
    close: () => Dispatch<ResultAction>;
}

const mapDispatchToProps = (dispatch: Dispatch<ResultAction>) => ({
    close: bindActionCreators(close, dispatch)
});

export class CloseDef extends React.Component<CloseProps> {

    constructor(props: CloseProps) {
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.close();
    }

    render() {
        return (
            <div className={styles.close} onClick={this.close}>
                <Icon icon='cross'/>
            </div>
        );
    }
}

export const Close = connect(null, mapDispatchToProps)(CloseDef);
