import * as React from 'react';
import {connect} from 'react-redux';
import * as styles from './mobile-header.scss';
import * as cx from 'classnames';
import {InitConfig} from 'checkout/config';
import {FormName, State} from 'checkout/state';
import {bindActionCreators, Dispatch} from 'redux';
import {NavigateDirection, navigateTo} from 'checkout/actions';
import {ChevronBack} from 'checkout/components/app/modal-container/modal/form-container/chevron-back';
import {toPrevious, toActiveFormName} from 'checkout/utils';

export interface MobileHeaderProps {
    initConfig: InitConfig;
    navigateTo: (formName: FormName, direction: NavigateDirection) => any;
    previous: FormName;
}

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig,
    previous: toPrevious(state.modals, toActiveFormName(state.modals))
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    navigateTo: bindActionCreators(navigateTo, dispatch)
});

const MobileHeaderDef: React.SFC<MobileHeaderProps> = (props) => (
    <header className={styles.header}>
        {props.previous ? <ChevronBack className={styles.back_btn} previous={props.previous} navigateTo={props.navigateTo}/> : null}
        <div className={cx(styles.text, {[styles._center]: true})}>
            {props.initConfig.name}
        </div>
    </header>
);

export const MobileHeader = connect(mapStateToProps, mapDispatchToProps)(MobileHeaderDef);
