import * as React from 'react';
import * as styles from './header.scss';
import * as cx from 'classnames';

export class Header extends React.Component {

    render() {
        return (
            <header className={styles.header}>
                <div className={styles.back_btn}>
                    <svg width='9px' height='60px' viewBox='0 0 9 60'>
                        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                            <g transform='translate(-25.000000, 0.000000)'>
                                <g transform='translate(25.000000, 0.000000)'>
                                    <path d='M8,24 L1,31' stroke='#9013FE' strokeWidth='2' />
                                    <path d='M1,30 L8,37 L1,30 Z' stroke='#9013FE' strokeWidth='2' />
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className={cx(styles.text, {
                    [styles._center]: true
                })}>
                    bangbangeducation.rubangbangeducation.rubangbangeducation.rubangbangeducation.ru
                </div>
            </header>
        );
    }
}
