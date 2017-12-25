import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './mobile-header.scss';
import * as cx from 'classnames';
import { InitConfig } from 'checkout/config';
import { State } from 'checkout/state';
import { setFormFlowAction, SetFormsFlowAction } from 'checkout/actions';
import { back, FormFlowItem, hasBack } from 'checkout/form-flow';
import { ChevronIcon } from './chevron-icon';

export interface MobileHeaderProps {
    initConfig: InitConfig;
    formsFlow: FormFlowItem[];
    setFormFlow: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
}

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig,
    formsFlow: state.formsFlow
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch)
});

class MobileHeaderDef extends React.Component<MobileHeaderProps> {

    constructor(props: MobileHeaderProps) {
        super(props);
        this.back = this.back.bind(this);
    }

    back(e: Event) {
        e.preventDefault();
        this.props.setFormFlow(back(this.props.formsFlow));
    }

    render() {
        return (
            <header className={styles.header}>
                {/*{hasBack(this.props.formsFlow) ? (*/}
                    {/*<button className={styles.back_btn} onClick={this.back as any}>*/}
                        {/*<ChevronIcon/>*/}
                    {/*</button>*/}
                {/*) : false}*/}
                <div className={cx(styles.text, {[styles._center]: true})}>
                    {this.props.initConfig.name}
                </div>
            </header>
        );
    }
}

export const MobileHeader = connect(mapStateToProps, mapDispatchToProps)(MobileHeaderDef);
