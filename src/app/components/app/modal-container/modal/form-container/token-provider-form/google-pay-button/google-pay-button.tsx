import * as React from 'react';
import { MouseEventHandler } from 'react';
import { google_pay_button } from './google-pay-button.scss';

export interface GooglePayButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const GooglePayButton: React.SFC<GooglePayButtonProps> = (props) => (
    <button type='button' id='google-pay-button' className={google_pay_button} onClick={props.onClick}/>
);
