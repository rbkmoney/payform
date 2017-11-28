import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './layout.scss';
import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { State, ConfigState, ResultState } from '../../state';
import { getAppConfig, GetAppConfigAction } from '../../actions';

interface AppProps {
    getAppConfig: () => Dispatch<GetAppConfigAction>;
    config: ConfigState;
    result: ResultState;
}

const mapStateToProps = (state: State) => ({
    config: state.config,
    result: state.result
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getAppConfig: bindActionCreators(getAppConfig, dispatch)
});

class AppDef extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount() {
        this.props.getAppConfig();
    }

    componentWillReceiveProps(props: AppProps) {

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

export const App = connect(mapStateToProps, mapDispatchToProps)(AppDef);
