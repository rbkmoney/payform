import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as formStyles from '../form-container.scss';
import * as styles from './amount-form.scss';
import { FormFlowItem, State } from 'checkout/state';
import { setFormFlowAction, SetFormsFlowAction } from 'checkout/actions';
import { Button } from 'checkout/components';
import { Amount } from './amount/amount';
import { next } from 'checkout/components/app/form-flow-manager';

export interface AmountFormProps {
    formsFlow: FormFlowItem[];
    setFormFlow: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
}

const mapStateToProps = (state: State) => ({
    formsFlow: state.formsFlow
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch)
});

class AmountFormDef extends React.Component<AmountFormProps> {

    constructor(props: AmountFormProps) {
        super(props);
        this.next = this.next.bind(this);
    }

    next(e: Event) {
        e.preventDefault();
        this.props.setFormFlow(next(this.props.formsFlow));
    }

    render() {
        return (
            <form>
                <div className={formStyles.header}>
                    <div className={formStyles.title}>
                        Укажите сумму оплаты
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <Amount/>
                </div>
                <Button type='primary' onClick={this.next}>Далее</Button>
            </form>
        );
    }
}

export const AmountForm = connect(mapStateToProps, mapDispatchToProps)(AmountFormDef);
