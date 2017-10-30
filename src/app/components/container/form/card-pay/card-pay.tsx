import * as React from 'react';
import { Input, PayButton } from '../../../index';

export class CardPay extends React.Component {
    render() {
        return (
            <form className={''}>
                <div className='form-group'>
                    <Input icon='card' placeholder='Номер на карте' />
                </div>
                <div className='form-group'>
                    <Input icon='calendar' placeholder='ММ/ГГ' />
                    <Input icon='lock' placeholder='CVV/CVC'/>
                </div>
                <div className='form-group'>
                    <Input icon='user' placeholder='Имя на карте' />
                </div>
                <div className='form-group'>
                    <Input icon='letter' placeholder='Email для чека' />
                </div>
                <PayButton />
            </form>
        );
    }
}
