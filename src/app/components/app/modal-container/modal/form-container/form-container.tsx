import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';

const FormContainerDef: React.SFC = () => (
    <div className={styles.container}>
        <div className={cx(styles.form, {
            [styles._error]: false
        })}>
            <CardForm/>
        </div>
    </div>
);

export const FormContainer = FormContainerDef;
