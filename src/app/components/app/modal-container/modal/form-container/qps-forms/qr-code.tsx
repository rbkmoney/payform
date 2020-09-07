import * as React from 'react';
import * as kjua from 'kjua';

export const QRCode: React.FC<kjua.Options> = (props) => (
    <div
        dangerouslySetInnerHTML={{
            __html: kjua({
                size: 300,
                fill: '#685bff',
                rounded: 100,
                crisp: true,
                ecLevel: 'H',
                quiet: 0,
                mode: 'plain',
                ...props
            }).outerHTML
        }}
    />
);
