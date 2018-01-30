import * as React from 'react';
import * as formStyles from './list.scss';

export const List: React.SFC = (props) => (
    <ul className={formStyles.list}>
        {props.children}
    </ul>
);
