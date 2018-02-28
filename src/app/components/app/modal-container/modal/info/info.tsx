import * as React from 'react';
import * as cx from 'classnames';
import { connect } from 'react-redux';
import * as styles from './info.scss';
import { InitConfig } from 'checkout/config';
import { ModelState, State } from 'checkout/state';
import { getAmount } from '../amount-resolver';
import { Amount, formatAmount } from 'checkout/utils';
import { Locale } from 'checkout/locale';

interface InfoState {
    amount: Amount;
    help?: boolean;
}

export interface InfoProps {
    initConfig: InitConfig;
    model: ModelState;
    locale: Locale;
}

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig,
    locale: state.config.locale,
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
            amount: getAmount(this.props.model, this.props.initConfig.amount)
        });
    }

    componentWillReceiveProps(props: InfoProps) {
        this.setState({
            amount: getAmount(props.model, this.props.initConfig.amount)
        });
    }

    toggleHelp() {
        this.setState({
            help: !this.state.help
        });
    }

    render() {
        const locale = this.props.locale;
        const name = this.props.initConfig.name;
        const description = this.props.initConfig.description;
        const email = this.props.initConfig.email;
        const dueDate = false;
        const recurrent = false;
        const formattedAmount = formatAmount(this.state.amount);
        return (
            <div className={styles.info}>
                <div>
                    {name ? <h4 className={styles.company_name} id='company-name-label'>{name}</h4> : false}
                    {formattedAmount ?
                        <h1 className={styles.amount}>
                            {formattedAmount.value}
                            <span>&nbsp;{formattedAmount.symbol}</span>
                        </h1> : false}
                    {description ?
                        <div>
                            <div className={styles.order}>{locale['info.order.label']}</div>
                            <div className={styles.product_description} id='product-description'>{description}</div>
                        </div>
                        : false}
                    {email ?
                        <div>
                            <div className={styles.order}>{locale['info.email.label']}</div>
                            <div className={styles.email}>{email}</div>
                        </div>
                        : false}
                    {dueDate ? <div className={styles.dueDate}>{locale['info.dueTime.text']} 23:56</div> : false}
                </div>
                {recurrent ? <div>
                    <div className={styles.subscription} onClick={this.toggleHelp}>
                        <span>{locale['info.subscription.label']}</span>
                        <svg width='15' height='15'>
                            <g transform='translate(1 1)' fill='none'>
                                <circle cx='7' cy='7' r='7'/>
                                <text>
                                    <tspan x='4' y='10'>?</tspan>
                                </text>
                            </g>
                        </svg>
                    </div>
                    <p className={cx(styles.help, {
                        [styles._hide]: !this.state.help
                    })}>
                        {locale['info.subscription.help.text']}
                    </p>
                </div> : false}
            </div>
        );
    }
}

export const Info = connect(mapStateToProps)(InfoDef);
