import * as React from 'react';
import * as styles from './result-form.scss';
import { ResultFormProps } from './result-form-props';
import { Button } from 'checkout/components';
import { makeContent } from './make-content';

const retry = (e: any, props: ResultFormProps) => {
    e.preventDefault();
    props.prepareToRetry(false);
};

const choseAnotherCard = (e: any, props: ResultFormProps) => {
    e.preventDefault();
    props.prepareToRetry(true);
};

const ActionBlock: React.SFC<ResultFormProps> = (props) => {
    const l = props.locale;
    return (
        <div className={styles.errorBlock}>
            <Button
                style='primary'
                onClick={(e) => retry(e, props)}
                id='retry-btn'>
                {l['form.button.pay.again.label']}
            </Button>
            <Button
                style='default'
                className={styles.pay_with_other}
                onClick={(e) => choseAnotherCard(e, props)}
                id='reenter-btn'>
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
    const {header, description, icon, hasActions, hasDone} = makeContent(
        props.resultFormInfo,
        props.locale,
        props.model.invoiceEvents,
        props.error
    );
    // if (hasDone) {
    //     props.setResult(ResultState.done);
    // }
    return (
        <form className={styles.form}>
            <h2 className={styles.title}>{header}</h2>
            {icon}
            {description ? description : false}
            {hasActions ? <ActionBlock {...props}/> : false}
        </form>
    );
};
