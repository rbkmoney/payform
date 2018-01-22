import * as React from 'react';
import { connect } from 'react-redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';
import { FormName, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { PaymentMethods } from './payment-methods';
import { FormContainerProps } from './form-container-props';
import { FormLoader } from './form-loader';
import { ResultForm } from './result-form';
import { findNamed } from 'checkout/utils';
import { WalletForm } from './wallet-form';

const toActiveFormInfo = (modals: ModalState[]) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return info.find((item) => item.active);
};

const mapStateToProps = (state: State) => ({
    activeFormInfo: toActiveFormInfo(state.modals)
});

const FormContainerDef: React.SFC<FormContainerProps> = (props) => {
    const {name, viewInfo} = props.activeFormInfo;
    return (
        <div className={styles.container}>
            <div className={cx(styles.form, {
                [styles._error]: viewInfo.error
            })}
                 style={{height: viewInfo.height}}>
                <CSSTransitionGroup
                    component='div'
                    transitionName={viewInfo.slideDirection}
                    transitionEnterTimeout={550}
                    transitionLeaveTimeout={550}
                >
                    {name === FormName.paymentMethods ? <PaymentMethods/> : null}
                    {name === FormName.cardForm ? <CardForm/> : null}
                    {name === FormName.walletForm ? <WalletForm /> : null}
                    {name === FormName.resultForm ? <ResultForm/> : null}
                </CSSTransitionGroup>
                <CSSTransitionGroup
                    component='div'
                    transitionName={{
                        appear: styles.appearLoader,
                        enter: styles.enterLoader,
                        leave: styles.leaveLoader
                    }}
                    transitionLeaveTimeout={200}
                    transitionEnterTimeout={450}
                    transitionAppearTimeout={450}
                    transitionAppear={true}
                    transitionEnter={true}
                    transitionLeave={true}
                >
                    {viewInfo.inProcess ? <FormLoader/> : null}
                </CSSTransitionGroup>
            </div>
        </div>
    );
};

export const FormContainer = connect(mapStateToProps)(FormContainerDef);
