import * as React from 'react';
import * as styles from './footer.scss';
import { connect } from 'react-redux';
import { State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { SecureIcon } from './secure-icon';
import { VisaIcon } from './visa-icon';
import { McIcon } from './mc-icon';
import { PciDssIcon } from './pci-dss-icon';
import { Logo } from './logo';

export interface FooterProps {
    locale: Locale;
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

const FooterDef: React.SFC<FooterProps> = (props) => (
    <footer className={styles.footer}>
        <div className={styles.safe_payment_container}>
            <div className={styles.safe_payment}>
                <SecureIcon className={styles.secure_icon} />
                <p className={styles.label}>{props.locale['footer.pay.label']}</p>
                {/*<Logo />*/}
            </div>
            <div className={styles.safe_logos}>
                <VisaIcon fillStyle={styles.fill_icons} />
                <McIcon className={styles.align_fix} fillStyle={styles.fill_icons} />
                <PciDssIcon className={styles.align_fix} fillStyle={styles.fill_icons} />
            </div>
        </div>
    </footer>
);

export const Footer = connect(mapStateToProps)(FooterDef);
