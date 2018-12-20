import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './info.scss';
import { State } from 'checkout/state';
import { formatAmount, FormattedAmount } from 'checkout/utils';
import { Locale } from 'checkout/locale';

export interface InfoProps {
    locale: Locale;
    name: string;
    description: string;
    email: string;
    formattedAmount: FormattedAmount;
}

const mapStateToProps = (s: State) => {
    const {
        config: { initConfig, locale }
    } = s;
    return {
        locale,
        name: initConfig.name,
        description: initConfig.description,
        email: initConfig.email,
        formattedAmount: formatAmount(s.amountInfo)
    };
};

const InfoDef: React.FC<InfoProps> = (props) => {
    const { formattedAmount, locale, name, description, email } = props;
    return (
        <div className={styles.info}>
            <div>
                {name ? (
                    <h4 className={styles.company_name} id="company-name-label">
                        {name}
                    </h4>
                ) : (
                    false
                )}
                {formattedAmount ? (
                    <h1 className={styles.amount}>
                        {formattedAmount.value}
                        <span>
                            &nbsp;
                            {formattedAmount.symbol}
                        </span>
                    </h1>
                ) : (
                    false
                )}
                {description ? (
                    <div>
                        <div className={styles.order}>{locale['info.order.label']}</div>
                        <div className={styles.product_description} id="product-description">
                            {description}
                        </div>
                    </div>
                ) : (
                    false
                )}
                {email ? (
                    <div>
                        <div className={styles.order}>{locale['info.email.label']}</div>
                        <div className={styles.email}>{email}</div>
                    </div>
                ) : (
                    false
                )}
            </div>
        </div>
    );
};

export const Info = connect(mapStateToProps)(InfoDef);
