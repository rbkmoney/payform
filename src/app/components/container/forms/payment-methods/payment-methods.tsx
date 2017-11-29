import * as React from 'react';
import * as TransitionGroup from 'react-transition-group';
import * as styles from './payment-methods.scss';
import * as formStyles from '../forms.scss';
import {Icon} from '../../../index';
import {IconType} from "../../../ui/icon/icon-type";

export class PaymentMethods extends React.Component {
    render() {
        const CSSTransitionGroup = TransitionGroup.CSSTransitionGroup;
        return (
            <form>
                <div className={formStyles.header}>
                    <div className={formStyles.back_btn}>
                        <Icon icon={IconType.chevronLeft}/>
                    </div>
                    <div className={formStyles.title}>
                        Выберите способ оплаты
                    </div>
                </div>
                <CSSTransitionGroup
                    className={styles.list}
                    component='ul'
                    transitionName={{
                        appear: styles.appearItem,
                        enter: styles.enterItem,
                        leave: styles.leaveItem
                    }}
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                    transitionAppearTimeout={1000}
                    transitionAppear={true}
                    transitionEnter={true}
                    transitionLeave={true}
                >
                    <li className={styles.method} key='1'>
                        <div className={styles.icon}>
                            {/* tslint:disable:max-line-length */}
                            <svg width='40px' height='40px' viewBox='0 0 40 40'>
                                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                                    <g transform='translate(-45.000000, -366.000000)'>
                                        <g transform='translate(5.000000, 276.000000)'>
                                            <g transform='translate(20.000000, 70.000000)'>
                                                <g transform='translate(20.000000, 20.000000)'>
                                                    <rect fill='#FFFFFF' x='0' y='0' width='40' height='40'/>
                                                    <path d='M29.99436,25 L5.0068,25 C3.899,25 3,24.0712 3,22.9252 L3,9.0748 C3,7.9288 3.899,7 5.0068,7 L29.99436,7 C31.10216,7 32,7.9288 32,9.0748 L32,22.9252 C32,24.0712 31.10216,25 29.99436,25 Z' stroke='#0077FF' strokeWidth='2' fill='#FFFFFF'/>
                                                    <path d='M34.99436,34 L10.0068,34 C8.899,34 8,33.0712 8,31.9252 L8,18.0748 C8,16.9288 8.899,16 10.0068,16 L34.99436,16 C36.10216,16 37,16.9288 37,18.0748 L37,31.9252 C37,33.0712 36.10216,34 34.99436,34 Z' stroke='#0077FF' strokeWidth='2' fill='#FFFFFF'/>
                                                    <polygon fill='#0077FF' points='4 13 31 13 31 12 4 12'/>
                                                    <polygon fill='#0077FF' points='11 28 27 28 27 27 11 27'/>
                                                    <polygon fill='#0077FF' points='30 28 34 28 34 27 30 27'/>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            {/* tslint:enable:max-line-length */}
                        </div>
                        <div className={styles.title}>
                            Банковская карта
                            <hr/>
                        </div>
                    </li>

                    <li className={styles.method} key='2'>
                        <div className={styles.icon}>
                            {/* tslint:disable:max-line-length */}
                            <svg width='40px' height='40px' viewBox='0 0 40 40'>
                                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                                    <g transform='translate(-45.000000, -456.000000)'>
                                        <g transform='translate(5.000000, 276.000000)'>
                                            <g transform='translate(20.000000, 160.000000)'>
                                                <g transform='translate(20.000000, 20.000000)'>
                                                    <rect fill='#FFFFFF' x='0' y='0' width='40' height='40'/>
                                                    <g transform='translate(8.000000, 3.000000)'>
                                                        <path d='M24,33 L0,33 L0,2.3674 C0,1.0602 1.05726316,0 2.36084211,0 L21.6391579,0 C22.9427368,0 24,1.0602 24,2.3674 L24,33 Z' stroke='#0077FF' strokeWidth='2' fill='#FFFFFF'/>
                                                        <path d='M3,16 L21,16 L21,3 L3,3 L3,16 Z M4,15 L20,15 L20,4 L4,4 L4,15 Z' fill='#0077FF'/>
                                                        <polygon fill='#0077FF' points='0 19 24 19 24 18 0 18'/>
                                                        <polygon fill='#0077FF' points='15 24 21 24 21 23 15 23'/>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            {/* tslint:enable:max-line-length */}
                        </div>
                        <div className={styles.text}>
                            <h5 className={styles.title}>
                                Наличные
                                <hr/>
                            </h5>
                            <p className={styles.description}>
                                Оплата через терминал, банкомат или салон связи </p>
                        </div>
                    </li>
                </CSSTransitionGroup>
            </form>
        );
    }
}
