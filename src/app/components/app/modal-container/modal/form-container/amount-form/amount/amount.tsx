import * as React from 'react';
import * as styles from './amount.scss';
import { IconType, Input } from 'checkout/components';

class AmountDef extends React.Component<any> { // TODO fix any

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={styles.inputContainer}>
                <Input className={styles.amountInput} icon={IconType.calendar} placeholder='Сумма оплаты'/>
            </div>
        );
    }
}

export const Amount = AmountDef;
