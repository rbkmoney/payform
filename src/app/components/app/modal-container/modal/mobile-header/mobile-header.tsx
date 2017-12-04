import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './mobile-header.scss';
import * as cx from 'classnames';
import { InitConfig } from 'checkout/config';
import { State } from 'checkout/state';

export interface MobileHeaderProps {
    initConfig: InitConfig;
}

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig,
});

const MobileHeaderDef: React.SFC<MobileHeaderProps> = (props) => (
    <header className={styles.header}>
        <button className={styles.back_btn}>
            <svg width='9px' height='60px' viewBox='0 0 9 60'>
                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                    <g transform='translate(-25.000000, 0.000000)'>
                        <g transform='translate(25.000000, 0.000000)'>
                            <path d='M8,24 L1,31' strokeWidth='2' />
                            <path d='M1,30 L8,37 L1,30 Z' strokeWidth='2' />
                        </g>
                    </g>
                </g>
            </svg>
        </button>
        <div className={cx(styles.text, {
            [styles._center]: true
        })}>
            {props.initConfig.name}
        </div>
    </header>
);

export const MobileHeader = connect(mapStateToProps)(MobileHeaderDef);
