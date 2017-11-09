import * as React from 'react';
import * as styles from './close.scss';
import {Icon} from '../../index'

export class Close extends React.Component {

    render() {
        return (
            <div className={styles.close}>
                <Icon icon='cross' />
            </div>
        );
    }
}
