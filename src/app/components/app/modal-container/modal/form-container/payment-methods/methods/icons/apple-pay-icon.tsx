import * as React from 'react';
import { icon } from '../methods.scss';

// export const ApplePayIcon: React.SFC = () => (
//     <svg width='70' height='40'
//          viewBox='0 0 512 210.2'>
//         <path
//             d='M93.6 27.1C87.6 34.2 78 39.8 68.4 39c-1.2-9.6 3.5-19.8 9-26.1 6-7.3 16.5-12.5 25-12.9 1 10-2.9 19.8-8.8 27.1m8.7 13.8c-13.9-.8-25.8 7.9-32.4 7.9-6.7 0-16.8-7.5-27.8-7.3-14.3.2-27.6 8.3-34.9 21.2-15 25.8-3.9 64 10.6 85 7.1 10.4 15.6 21.8 26.8 21.4 10.6-.4 14.8-6.9 27.6-6.9 12.9 0 16.6 6.9 27.8 6.7 11.6-.2 18.9-10.4 26-20.8 8.1-11.8 11.4-23.3 11.6-23.9-.2-.2-22.4-8.7-22.6-34.3-.2-21.4 17.5-31.6 18.3-32.2-10-14.8-25.6-16.4-31-16.8m80.3-29v155.9h24.2v-53.3h33.5c30.6 0 52.1-21 52.1-51.4s-21.1-51.2-51.3-51.2h-58.5zm24.2 20.4h27.9c21 0 33 11.2 33 30.9s-12 31-33.1 31h-27.8V32.3zM336.6 169c15.2 0 29.3-7.7 35.7-19.9h.5v18.7h22.4V90.2c0-22.5-18-37-45.7-37-25.7 0-44.7 14.7-45.4 34.9h21.8c1.8-9.6 10.7-15.9 22.9-15.9 14.8 0 23.1 6.9 23.1 19.6v8.6l-30.2 1.8c-28.1 1.7-43.3 13.2-43.3 33.2 0 20.2 15.7 33.6 38.2 33.6zm6.5-18.5c-12.9 0-21.1-6.2-21.1-15.7 0-9.8 7.9-15.5 23-16.4l26.9-1.7v8.8c0 14.6-12.4 25-28.8 25zm82 59.7c23.6 0 34.7-9 44.4-36.3L512 54.7h-24.6l-28.5 92.1h-.5l-28.5-92.1h-25.3l41 113.5-2.2 6.9c-3.7 11.7-9.7 16.2-20.4 16.2-1.9 0-5.6-.2-7.1-.4v18.7c1.4.4 7.4.6 9.2.6z'/>
//     </svg>
// );

export const ApplePayIcon: React.SFC = () => (
    <div className={icon}>
        <svg viewBox='0 0 180 180'>
            <path fill='#0077ff'
                  d='M150.37 130.25a88.08 88.08 0 0 1-8.71 15.66c-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.2-2.12-9.97-3.17-14.34-3.17-4.58 0-9.5 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.93.21-9.84-1.96-14.74-6.52-3.13-2.73-7.05-7.41-11.74-14.04-5.03-7.08-9.17-15.29-12.4-24.65-3.48-10.11-5.22-19.9-5.22-29.38 0-10.86 2.35-20.22 7.04-28.07 3.7-6.3 8.61-11.27 14.76-14.92s12.8-5.51 19.95-5.63c3.91 0 9.05 1.21 15.43 3.6 6.36 2.38 10.44 3.59 12.23 3.59 1.34 0 5.88-1.42 13.57-4.24 7.28-2.62 13.42-3.7 18.45-3.27 13.63 1.1 23.87 6.47 30.68 16.15-12.19 7.38-18.22 17.73-18.1 31 .11 10.34 3.86 18.94 11.23 25.77a36.9 36.9 0 0 0 11.22 7.36c-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.1-2.96 15.67-8.86 22.67-7.12 8.32-15.73 13.13-25.07 12.37-.12-.97-.19-2-.19-3.07 0-7.77 3.39-16.1 9.4-22.9 3-3.45 6.82-6.32 11.45-8.6 4.62-2.25 8.99-3.5 13.1-3.71.12 1.08.17 2.17.17 3.24z'/>
        </svg>
    </div>
);