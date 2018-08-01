import * as React from 'react';
import * as styles from './list.scss';

interface NumerableListProps {
    children: JSX.Element[];
}

export const NumerableList: React.SFC<NumerableListProps> = (props) => (
    <ul className={styles.list}>{props.children}</ul>
);
