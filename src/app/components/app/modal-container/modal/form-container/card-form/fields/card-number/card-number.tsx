import * as React from 'react';
import {getCardType} from './get-card-type';
import * as styles from './card-number.scss';
import {Input} from '../../../input';
import {Icon} from '../../../../../../../ui/icon';

interface IState {
    cardNumber: string
}

export class CardNumber extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            cardNumber: '5555555555554444'
        }
    }

    getCardType(cardNumber: string): string {
        return getCardType(cardNumber.replace(/\s/g, '')).type;
    }

    render() {
        return (
            <div className={styles.inputContainer}>
                <Input className={styles.cardNumberInput} icon='card' placeholder='Номер на карте'/>
                <Icon className={styles.cardTypeIcon} icon={this.getCardType(this.state.cardNumber)} />
            </div>
        );
    }
}
