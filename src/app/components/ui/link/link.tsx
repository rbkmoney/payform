import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './link.scss';

interface LinkProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

export const Link: React.SFC<LinkProps> = ({ className, children, ...props }) => (
    <a className={cx(styles.link, className)} {...props}>
        {children}
    </a>
);
