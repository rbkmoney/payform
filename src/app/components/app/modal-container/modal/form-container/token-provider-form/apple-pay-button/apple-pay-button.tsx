import * as React from 'react';
import { apple_pay_button } from './apple-pay-button.scss';
import { MouseEventHandler } from 'react';

export interface ApplePayButtonProps {
    onClick: MouseEventHandler<any>;
}

export const ApplePayButton: React.FC<ApplePayButtonProps> = (props) => (
    <button type="button" id="apple-pay-button" className={apple_pay_button} onClick={props.onClick} />
);
