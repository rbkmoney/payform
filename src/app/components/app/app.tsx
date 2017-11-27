import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';
import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { ConfigAction, setConfig } from '../../actions';
import { State, ConfigState } from '../../state';
import { Transport, Child } from '../../../communication-ts';
import { ResultState } from '../../state/result-state';
import { PossibleEvents } from '../../../communication-ts/possible-events';

interface AppProps {
    setConfig: (transport: Transport) => Dispatch<ConfigAction>;
    config: ConfigState;
    result: ResultState;
}

function finalize(transport: Transport, result: ResultState) {
    switch (result) {
        case ResultState.close:
            transport.emit(PossibleEvents.close);
            break;
        case ResultState.done:
            transport.emit(PossibleEvents.done);
            break;
    }
    transport.destroy();
}

class AppDef extends React.Component<AppProps> {

    private transport: Transport;

    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount() {
        Child.resolve().then((transport) => {
            this.transport = transport;
            this.props.setConfig(transport);
        });
    }

    componentWillReceiveProps(props: AppProps) {
        if (props.result) {
            finalize(this.transport, props.result);
        }
    }

    render() {
        return (
            <div className={styles.layout}>
                <Overlay/>
                {/*<LayoutLoader/>*/}
                <ModalContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    config: state.config,
    result: state.result
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setConfig: bindActionCreators(setConfig, dispatch)
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppDef);
