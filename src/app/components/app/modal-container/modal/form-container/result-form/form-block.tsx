import * as React from 'react';
import * as styles from './result-form.scss';
import { ResultFormProps } from './result-form-props';
import { Button } from 'checkout/components';
import { makeContent } from './make-content';
import { IntegrationType } from 'checkout/config';
import { StepStatus } from 'checkout/lifecycle';
import { CardFormFlowItem, FormFlowStatus, FormName, DirectionTransition, getByFormName } from 'checkout/form-flow';
import { Cross, Checkmark } from './result-icons';

const retry = (e: any, props: ResultFormProps) => {
    e.preventDefault();
    props.resetStage('cardPayment');
    if (props.initConfig.integrationType === IntegrationType.invoiceTemplate) {
        props.changeStepStatus('cardPayment', 'createInvoice', StepStatus.done);
    }
    const cardForm = getByFormName(props.formsFlow, FormName.cardForm) as CardFormFlowItem;
    cardForm.active = true;
    cardForm.status = FormFlowStatus.inProcess;
    cardForm.view.slideDirection = DirectionTransition.left;
    props.setFormFlow([cardForm]);
};

const choseAnotherCard = (e: any, props: ResultFormProps) => {
    e.preventDefault();
    props.resetStage('cardPayment');
    const cardForm = getByFormName(props.formsFlow, FormName.cardForm) as CardFormFlowItem;
    if (props.initConfig.integrationType === IntegrationType.invoiceTemplate) {
        props.setModel({
            ...props.model,
            paymentResource: null,
            payment: null,
            invoice: null,
            invoiceAccessToken: null,
            invoiceEvents: null
        });
        cardForm.handledEventID = 0;
    } else {
        props.setModel({
            ...props.model,
            paymentResource: null,
            payment: null
        });
    }
    cardForm.active = true;
    cardForm.status = FormFlowStatus.unprocessed;
    cardForm.values = null;
    cardForm.needToReset = true;
    cardForm.view.slideDirection = DirectionTransition.left;
    props.setFormFlow([cardForm]);
};

const ActionBlock: React.SFC<ResultFormProps> = (props) => {
    const l = props.locale;
    return (
        <div className={styles.errorBlock}>
            <Button
                style='primary'
                onClick={(e) => retry(e, props)}>
                {l['form.button.pay.again.label']}
            </Button>
            <Button
                style='default'
                className={styles.pay_with_other}
                onClick={(e) => choseAnotherCard(e, props)}>
                {l['form.button.pay.other.card.label']}
            </Button>
            {/*<div className={styles.link_container}>*/}
            {/*<a href='' className={styles.link}>{l['form.payment.method.name.others.label']}</a>*/}
            {/*<hr/>*/}
            {/*</div>*/}
        </div>
    );
};

export const FormBlock: React.SFC<ResultFormProps> = (props) => {
    const {header, description, status, hasActions} = makeContent(props.locale, props.model, props.active);
    return (
        <form className={styles.form}>
            <h2 className={styles.title}>{header}</h2>
            {status === 'success' ? <Checkmark/> : null}
            {status === 'failed' ? <Cross/> : null}
            {description ? description : false}
            {hasActions ? <ActionBlock {...props}/> : false}
        </form>
    );
};
