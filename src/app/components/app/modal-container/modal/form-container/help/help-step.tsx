import * as React from 'react';
import { list_item, list_item_number, list_item_text } from './help.scss';

export const helpStep: React.SFC<any> = (step: string, i: number): JSX.Element => (
    <li className={list_item} key={i}>
        <div className={list_item_number}>
            {i + 1}
        </div>
        <div className={list_item_text}>
            {step}
        </div>
    </li>
);
