import * as React from 'react';
import * as styles from '../methods.scss';

export const WalletsIcon: React.SFC = () => (
    <div className={styles.icon}>
        {/* tslint:disable:max-line-length */}
        <svg width='40' height='40' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
            <path transform='translate(2.5, 2.5)'
                  d='M23.242 13.5a1.496 1.496 0 1 0-2.993.001 1.496 1.496 0 0 0 2.993-.001zM27 10.508v5.984h-7.518a1.01 1.01 0 0 1-.997-.998v-3.988c0-.54.457-.998.997-.998H27zm0 7.978v5.522A2.991 2.991 0 0 1 24.009 27H2.99A2.991 2.991 0 0 1 0 24.008V2.992A2.991 2.991 0 0 1 2.991 0H24.01A2.991 2.991 0 0 1 27 2.992v5.522h-7.518a3.001 3.001 0 0 0-2.991 2.992v3.988a3.001 3.001 0 0 0 2.991 2.992H27z'
                  fill='#685BFF' fillRule='evenodd'/>
        </svg>
        {/* tslint:enable:max-line-length */}
    </div>
);
