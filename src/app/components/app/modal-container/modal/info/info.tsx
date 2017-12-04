import * as React from 'react';
import * as styles from './info.scss';
import * as cx from 'classnames';
import { InitConfig } from 'checkout/config';
import { ModelState, State } from 'checkout/state';
import { connect } from 'react-redux';
import { Amount, formatAmount, getAmount } from '../amount-resolver';

interface InfoState {
    amount: Amount;
    help?: boolean;
}

export interface InfoProps {
    initConfig: InitConfig;
    model: ModelState;
}

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig,
    model: state.model
});

class InfoDef extends React.Component<InfoProps, InfoState> {

    constructor(props: InfoProps) {
        super(props);
        this.state = {
            amount: null,
            help: true
        };
        this.toggleHelp = this.toggleHelp.bind(this);
    }

    componentDidMount() {
        this.setState({
            amount: getAmount(this.props.initConfig.integrationType, this.props.model)
        });
    }

    componentWillReceiveProps(props: InfoProps) {
        this.setState({
            amount: getAmount(props.initConfig.integrationType, props.model)
        });
    }

    toggleHelp() {
        this.setState({
            help: !this.state.help
        });
    }

    render() {
        const name = this.props.initConfig.name;
        const description = this.props.initConfig.description;
        const dueDate = false;
        const recurrent = false;
        const formattedAmount = formatAmount(this.state.amount);
        return (
            <div className={styles.info}>
                <div>
                    {name ? <h4 className={styles.site_name}>{name}</h4> : false}
                    {formattedAmount ?
                        <h1 className={styles.amount}>
                            {formattedAmount.value}
                            <span>&nbsp;{formattedAmount.symbol}</span>
                        </h1> : false}
                    {description ?
                        <div>
                            <div className={styles.order}>ваш заказ</div>
                            <div className={styles.description}>{description}</div>
                        </div>
                        : false}
                    {dueDate ? <div className={styles.dueDate}>Оплатите в течение 23:56</div> : false}
                </div>
                {recurrent ? <div>
                    <div className={styles.subscription} onClick={this.toggleHelp}>
                        <span>Ежемесячный платёж</span>
                        <svg width='15px' height='15px' viewBox='0 0 15 15'>
                            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                                <g transform='translate(-201.000000, -205.000000)'>
                                    <g transform='translate(25.000000, 30.000000)'>
                                        <g transform='translate(177.000000, 176.000000)'>
                                            <circle strokeWidth='2' cx='6.5' cy='6.5' r='6.5'/>
                                            <text>
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
                </div> : false}
            </div>
        );
    }
}

export const Info = connect(mapStateToProps)(InfoDef);
