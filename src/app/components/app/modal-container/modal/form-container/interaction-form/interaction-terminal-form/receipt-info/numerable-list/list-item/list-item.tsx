import * as React from 'react';
import * as formStyles from './list-item.scss';

interface ListItemProps {
    number: number;
}

export const ListItem: React.SFC<ListItemProps> = (props) => (
    <li className={formStyles.list_item}>
        <div className={formStyles.list_item_number}>{props.number}</div>
        <div className={formStyles.list_item_text}>{props.children}</div>
    </li>
);
