import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './mobile-header.scss';
import * as cx from 'classnames';
import { InitConfig } from 'checkout/config';
import { FormFlowItem, State } from 'checkout/state';
import { setFormFlowAction, SetFormsFlowAction } from 'checkout/actions';
import { back, hasBack } from 'checkout/components/app/form-flow-manager';

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
                {hasBack(this.props.formsFlow) ? (
                    <button className={styles.back_btn} onClick={this.back as any}>
                        {/*<Icon icon={IconType.chevronLeft}/>*/}
                        <svg width='9px' height='60px' viewBox='0 0 9 60'>
                            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                                <g transform='translate(-25.000000, 0.000000)'>
                                    <g transform='translate(25.000000, 0.000000)'>
                                        <path d='M8,24 L1,31' strokeWidth='2'/>
                                        <path d='M1,30 L8,37 L1,30 Z' strokeWidth='2'/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </button>
                ) : false}
                <div className={cx(styles.text, {[styles._center]: true})}>
                    {this.props.initConfig.name}
                </div>
            </header>
        );
    }
}

export const MobileHeader = connect(mapStateToProps, mapDispatchToProps)(MobileHeaderDef);
