import * as React from 'react';
import * as styles from './modal-error.scss';
import { Close } from 'checkout/components/app/modal-container/modal/close';

interface ModalErrorProps {
    inFrame: boolean;
}

export const ModalError: React.SFC<ModalErrorProps> = ({ children, inFrame }) => {
    return (
        <div className={styles.modalError}>
            {!inFrame && <Close />}
            <h2 className={styles.title}>Платежная форма не была инициализирована</h2>
            <p className={styles.message}>{children}</p>
        </div>
    );
};
