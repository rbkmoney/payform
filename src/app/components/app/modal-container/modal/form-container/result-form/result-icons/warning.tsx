import * as React from 'react';
import * as styles from './warning.scss';

export const Warning: React.SFC = () => (

<svg viewBox="0 0 50 50" version="1.1" className={styles.warning}>
    <g stroke="none" strokeWidth="0" fill="none" fillRule="evenodd">
        <g id="warning">
            <circle id='Oval' cx='25' cy='25' r='25'/>
            <path d='M28.4211313,35.5394344 C28.4211313,37.4408848 26.9000291,39 24.9605656,39 C23.0211022,39 21.5,37.4408848 21.5,35.5394344 C21.5,33.6380566 23.0211749,32.0789414 24.9605656,32.0789414 C26.8999564,32.0789414 28.4211313,33.6380566 28.4211313,35.5394344 Z M26.5465007,28.6183758 L23.3385799,28.6183758 C22.8630901,28.6183758 22.4716215,28.2444236 22.4498894,27.7694426 L21.7707428,12.9303377 C21.7475571,12.4235944 22.1521813,12 22.6594334,12 L27.2595174,12 C27.7676417,12 28.172484,12.42483 28.1481353,12.9323728 L27.435046,27.771405 C27.4122963,28.2455865 27.021191,28.6183758 26.5465007,28.6183758 Z' fillRule='nonzero'/>
        </g>
    </g>
</svg>
);
