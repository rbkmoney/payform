import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './mobile-header.scss';
import * as cx from 'classnames';
import { InitConfig } from 'checkout/config';
import { FormInfo, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { Direction, goToFormInfo } from 'checkout/actions';
import { ChevronBack } from '../form-container/chevron-back';
import { findInfoWithPrevious, findNamed } from 'checkout/utils';

export interface MobileHeaderProps {
    initConfig: InitConfig;
    goToFormInfo: (formInfo: FormInfo, direction: Direction) => any;
    destination: FormInfo;
}

const getDestination = (modals: ModalState[]): FormInfo => {
    const modalForms = findNamed(modals, ModalName.modalForms) as ModalForms;
    const withPrevious = findInfoWithPrevious(modals);
    return withPrevious ? findNamed(modalForms.formsInfo, withPrevious.previous) as FormInfo : null;
};

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig,
    destination: getDestination(state.modals)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    goToFormInfo: bindActionCreators(goToFormInfo, dispatch)
});

const MobileHeaderDef: React.SFC<MobileHeaderProps> = (props) => (
    <header className={styles.header}>
        {props.destination ?
            <ChevronBack
                className={styles.back_btn}
                back={props.goToFormInfo.bind(null, props.destination, Direction.back)} id='mobile-back-btn'/> : null}
        <div className={cx(styles.text, {[styles._center]: true})}>
            {props.initConfig.name}
        </div>
    </header>
);

export const MobileHeader = connect(mapStateToProps, mapDispatchToProps)(MobileHeaderDef);
