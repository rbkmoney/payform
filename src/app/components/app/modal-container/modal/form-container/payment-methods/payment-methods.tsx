import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as TransitionGroup from 'react-transition-group';
import * as formStyles from '../form-container.scss';
import * as styles from './payment-methods.scss';
import { FormInfo, PaymentMethod, State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { goToFormInfo, setViewInfoHeight } from 'checkout/actions';
import { getMethods } from './methods';

export interface PaymentMethodsProps {
    locale: Locale;
    methods: PaymentMethod[];
    setFormInfo: (formInfo: FormInfo) => any;
    setViewInfoHeight: (height: number) => any;
}

const mapStateToProps = (s: State) => ({
    locale: s.config.locale,
    methods: s.availablePaymentMethods
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormInfo: bindActionCreators(goToFormInfo, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

const CSSTransitionGroup = TransitionGroup.CSSTransitionGroup;

class PaymentMethodsDef extends React.Component<PaymentMethodsProps> {

    componentWillMount() {
        this.props.setViewInfoHeight(306);
    }

    render() {
        const {methods, locale, setFormInfo} = this.props;
        return (
            <form>
                <div>
                    <div className={formStyles.header}>
                        <div className={formStyles.title}>
                            {locale['form.header.payment.methods.label']}
                        </div>
                    </div>
                    <CSSTransitionGroup
                        className={styles.list}
                        component='ul'
                        transitionName={{
                            appear: styles.appearItem,
                            enter: styles.enterItem,
                            leave: styles.leaveItem
                        }}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionAppearTimeout={1000}
                        transitionAppear={true}
                        transitionEnter={true}
                        transitionLeave={true}>
                        {getMethods(methods, {locale, setFormInfo})}
                    </CSSTransitionGroup>
                </div>
            </form>
        );
    }
}

export const PaymentMethods = connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsDef);
