import * as React from 'react';
import * as styles from './modal-error.scss';
import { Close } from 'checkout/components/app/modal-container/modal/close';

interface ModalErrorProps {
    inFrame: boolean;
    error?: { message?: string; code?: string };
}

export const ModalError: React.SFC<ModalErrorProps> = ({ error, inFrame }) => {
    const errorMessage = error && (error.message || error.code);
    return (
        <div className={styles.modalError}>
            {!inFrame && <Close />}
            <h2 className={styles.title}>Платежная форма не была инициализирована</h2>
            {errorMessage && (
                <p className={styles.message}>
                    {error.code && error.message ? (
                        <>
                            {error.code}
                            <br />
                            {error.message}
                        </>
                    ) : (
                        errorMessage
                    )}
                </p>
            )}
        </div>
    );
};
