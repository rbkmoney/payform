import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './mobile-header.scss';
import * as cx from 'classnames';
import { InitConfig } from 'checkout/config';
import { FormInfo, FormName, State } from 'checkout/state';
import { NavigateDirection, navigateTo } from 'checkout/actions';
import { ChevronBack } from '../form-container/chevron-back';
import { findInfoWithPrevious } from 'checkout/utils';

export interface MobileHeaderProps {
    initConfig: InitConfig;
    navigateTo: (formName: FormName, direction: NavigateDirection) => any;
    infoWithPrevious: FormInfo;
}

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig,
    infoWithPrevious: findInfoWithPrevious(state.modals)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    navigateTo: bindActionCreators(navigateTo, dispatch)
});

const MobileHeaderDef: React.SFC<MobileHeaderProps> = (props) => (
    <header className={styles.header}>
        {props.infoWithPrevious ?
            <ChevronBack
                className={styles.back_btn}
                destination={props.infoWithPrevious.previous}
                navigateTo={props.navigateTo}/> : null}
        <div className={cx(styles.text, {[styles._center]: true})}>
            {props.initConfig.name}
        </div>
    </header>
);

export const MobileHeader = connect(mapStateToProps, mapDispatchToProps)(MobileHeaderDef);
