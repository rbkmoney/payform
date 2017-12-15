import * as React from 'react';
import * as styles from './result-form.scss';
import { Button } from 'checkout/components';
import { connect } from 'react-redux';
import { State } from 'checkout/state';
import { bindActionCreators, Dispatch } from 'redux';
import { FormFlowItem, getActive } from 'checkout/form-flow';
import { setFormFlowAction, SetFormsFlowAction } from 'checkout/actions';
import { ResultFormFlowItem } from 'checkout/form-flow';
import {
    ChangeType, InvoiceStatusChanged, InvoiceStatuses, PaymentStatusChanged,
    PaymentStatuses
} from 'checkout/backend';
import { Locale } from 'checkout/locale';

export interface ResultFormProps {
    locale: Locale;
    flowItems: FormFlowItem[];
    setFormFlow: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
}

const ErrorBlock: React.SFC = () => (
    <div className={styles.errorBlock}>
        {/*<div className={cx(styles.link_container, styles.help)}>
            <a href='' className={styles.link}>Как решить проблему?</a>
            <hr/>
        </div>*/}
        <Button style='primary'>Попробовать ещё раз</Button>
        <Button style='default' className={styles.pay_with_other}>Оплатить другой картой</Button>
        <div className={styles.link_container}>
            <a href='' className={styles.link}>Другие способы оплаты</a>
            <hr/>
        </div>
    </div>
);

interface ResultFormContent {
    error: boolean;
    header: string;
    description?: string;
    image: string;
}

const gotFailedPayment = (locale: Locale, paymentChange: PaymentStatusChanged) => ({
    error: true,
    header: locale['form.header.final.failed.label'],
    description: locale[paymentChange.error.code],
    image: 'http://www.rabbitpoets.com/wp-content/uploads/2009/07/spiceandwolf21.jpg'
});

const gotSuccessPayment = (locale: Locale) => ({
    error: false,
    header: locale['form.header.final.success.label'],
    description: locale['form.final.success.card.text'],
    image: 'https://avatanplus.com/files/resources/mid/56ece2c5863321538d55d3ae.png'
});

const makeContent = (props: ResultFormProps): ResultFormContent => {
    const locale = props.locale;
    const flowItem = getActive(props.flowItems) as ResultFormFlowItem;
    const change = flowItem.change;

    switch (change.changeType) {
        case ChangeType.InvoiceStatusChanged:
            const invoiceChange = change as InvoiceStatusChanged;
            switch (invoiceChange.status) {
                case InvoiceStatuses.paid:
                    return gotSuccessPayment(locale);
            }
            break;
        case ChangeType.PaymentStatusChanged:
            const paymentChange = change as PaymentStatusChanged;
            switch (paymentChange.status) {
                case PaymentStatuses.failed:
                    return gotFailedPayment(locale, paymentChange);
                case PaymentStatuses.processed:
                    return gotSuccessPayment(locale);
            }
            break;
    }
};

const ResultFormDef: React.SFC<ResultFormProps> = (props) => {
    const {header, description, image, error} = makeContent(props);
    return (
        <form className={styles.form}>
            <h2 className={styles.title}>{header}</h2>
            <img className={styles.image} src={image}/>
            {description ? <p className={styles.text}> {description} </p> : false}
            {error ? <ErrorBlock/> : false}
        </form>
    );
};

const mapStateToProps = (state: State) => ({
    flowItems: state.formsFlow,
    locale: state.config.locale
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch)
});

export const ResultForm = connect(mapStateToProps, mapDispatchToProps)(ResultFormDef);