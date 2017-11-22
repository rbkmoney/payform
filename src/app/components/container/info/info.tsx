import * as React from 'react';
import * as styles from './info.scss';
import * as cx from 'classnames';

interface InfoState {
    help?: boolean;
}

export class Info extends React.Component<{}, InfoState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            help: false
        };

        this.toggleHelp = this.toggleHelp.bind(this);
    }

    toggleHelp() {
        this.setState({
            help: !this.state.help
        } as InfoState);
    }

    render() {
        return (
            <div className={styles.info}>
                <div>
                    <h4 className={styles.site_name}>bangbangeducation.ru</h4>
                    <h1 className={styles.amount}>
                        3 144 599, 77
                        <span>&nbsp;₽</span>
                    </h1>
                    <div className={styles.order}>
                        ваш заказ
                    </div>
                    <div className={styles.description}>
                        Практический онлайн-курс скетчинга для дизайнеров
                    </div>
                    <div className={styles.dueDate}>
                        Оплатите в течение 23:56
                    </div>
                </div>
                <div>
                    <div className={styles.subscription} onClick={this.toggleHelp}>
                        <span>Ежемесячный платёж</span>
                        <svg width='15px' height='15px' viewBox='0 0 15 15'>
                            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                                <g transform='translate(-201.000000, -205.000000)'>
                                    <g transform='translate(25.000000, 30.000000)'>
                                        <g transform='translate(177.000000, 176.000000)'>
                                            <circle stroke='#FFFFFF' strokeWidth='2' cx='6.5' cy='6.5' r='6.5'/>
                                            <text fill='#FFFFFF'>
                                                <tspan x='4' y='10'>?</tspan>
                                            </text>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <p className={cx(styles.help, {
                        [styles._hide]: !this.state.help
                    })}>
                        Деньги списываются 17 числа каждого месяца. Мы вышлем инструкцию, как отключить автоплатеж на
                        email.
                    </p>
                </div>
            </div>
        );
    }
}
