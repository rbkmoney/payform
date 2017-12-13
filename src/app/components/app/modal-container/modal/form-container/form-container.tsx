import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';
import { State, FormName, FormFlowItem, FormFlowStatus } from 'checkout/state';
import { PaymentMethods } from './payment-methods';
import { getActive } from 'checkout/components/app/form-flow-manager';

export interface FormContainerProps {
    formsFlow: FormFlowItem[];
}

const mapStateToProps = (state: State) => ({
    formsFlow: state.formsFlow
});

class FormContainerDef extends React.Component<FormContainerProps> {

    private activeFlow: FormFlowItem;

    constructor(props: FormContainerProps) {
        super(props);
    }

    componentWillMount() {
        this.activeFlow = getActive(this.props.formsFlow);
    }

    componentWillReceiveProps(props: FormContainerProps) {
        this.activeFlow = getActive(this.props.formsFlow);
        if (this.activeFlow.status === FormFlowStatus.inProcess) {
            switch (this.activeFlow.formName) {
                case FormName.cardForm:
                    // const selector = formValueSelector(FormName.cardForm);

            }
        }
    }

    render() {
        const {formName, status} = this.activeFlow;
        return (
            <div className={styles.container}>
                <div className={cx(styles.form, {[styles._error]: status === FormFlowStatus.error})}>
                    {formName === FormName.paymentMethods ? <PaymentMethods/> : false}
                    {formName === FormName.cardForm ? <CardForm/> : false}
                </div>
            </div>
        );
    }
}

export const FormContainer = connect(mapStateToProps)(FormContainerDef);
