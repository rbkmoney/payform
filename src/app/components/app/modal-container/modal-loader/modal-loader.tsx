import * as React from 'react';
import * as cx from 'classnames';

import * as styles from './modal-loader.scss';
import { Loader } from 'checkout/components';

export const ModalLoader: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
    className,
    ...restProps
}) => (
    <div className={cx(styles.loader, className)} {...restProps}>
        <Loader />
    </div>
);
