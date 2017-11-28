import * as React from 'react';
import * as styles from './card-number.scss';
import { Input } from '../../../input';
import { CardTypeIcon } from './card-type-icon';

interface CardNumberState {
    cardNumber: string;
}

export class CardNumber extends React.Component<{}, CardNumberState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            cardNumber: '4242 4242 4242 4242'
        };
    }

    render() {
        return (
            <div className={styles.inputContainer}>
                <Input className={styles.cardNumberInput} icon='card' placeholder='Номер на карте'/>
                <CardTypeIcon cardNumber={this.state.cardNumber}/>
            </div>
        );
    }
}
