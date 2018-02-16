import * as React from 'react';
import * as styles from './footer.scss';
import { connect } from 'react-redux';
import { State } from 'checkout/state';
import { Locale } from 'checkout/locale';

export interface FooterProps {
    locale: Locale;
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

class FooterDef extends React.Component<FooterProps> {

    render() {
        const locale = this.props.locale;
        return (
            <footer className={styles.footer}>
                <div className={styles.safe_payment_container}>
                    <div className={styles.safe_payment}>
                        <svg width='8px' height='11px' viewBox='0 0 8 11'>
                            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                                <g transform='translate(-2.000000, -29.000000)'>
                                    <g transform='translate(0.000000, 29.000000)'>
                                        <g transform='translate(2.000000, 0.000000)'>
                                            <path
                                                d='M1,4.5 C0.723857625,4.5 0.5,4.72385763 0.5,5 L0.5,10 C0.5,10.2761424 0.723857625,10.5 1,10.5 L7,10.5 C7.27614237,10.5 7.5,10.2761424 7.5,10 L7.5,5 C7.5,4.72385763 7.27614237,4.5 7,4.5 L6.5,4.5 L6.5,3.00008185 C6.5,1.61941518 5.38074852,0.500163704 4.00008185,0.500163704 C2.61941519,0.500163704 1.50016371,1.61941518 1.50016371,3.00008185 L1.50016371,4.5 L1,4.5 Z'
                                                strokeWidth='1'/>
                                            <rect fillRule='evenodd' x='1' y='4' width='6' height='6'/>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <h5 className={styles.text}>{locale['footer.pay.label']}</h5>
                    </div>
                    <div className={styles.safe_logos}>
                        <svg className={styles.visa_icon} width='59px' height='32px' viewBox='0 0 59 32'>
                            <g id='icon' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                                <g className={styles.fill_icons} transform='translate(-65.000000, -26.000000)'>
                                    <g id='verified-by-visa-(1)' transform='translate(65.000000, 26.000000)'>
                                        <path
                                            d='M50.2702802,21.3171966 C50.1887633,21.9448889 50.0813092,22.5476923 49.9484879,23.1256068 C49.3895556,22.9508376 48.7442609,22.6702222 47.8336087,22.7287521 C47.2900676,22.7637607 46.6470531,22.9639658 46.6382174,23.4343932 C46.6285266,23.9554188 47.5209372,24.2652991 48.0174493,24.4931282 C48.9127101,24.9042051 49.8735266,25.4520342 49.9484879,26.5665641 C50.0057778,27.423453 49.5913527,28.1690256 49.1207778,28.5959658 C47.8678116,29.7323761 45.087686,29.8524444 43.1902802,29.1254701 C43.3085652,28.5182906 43.4160193,27.9007179 43.5123575,27.2724786 C44.2468647,27.5722393 45.2558502,27.9770256 46.362599,27.8460171 C46.8665217,27.7861197 47.483599,27.5041368 47.4659275,27.008 C47.4439807,26.4024615 46.2662609,26.0422564 45.6728406,25.728547 C44.9833671,25.3639658 44.1986957,24.7573333 44.155657,23.8315214 C44.1271546,23.2147692 44.3774058,22.6371282 44.7074638,22.2435556 C45.6870918,21.0751453 48.2047101,20.6599658 50.2702802,21.3171966'
                                            id='Fill-1'/>
                                        <polyline id='Fill-2'
                                                  points='27.7385507 9.50263248 30.2732705 9.50263248 28.7127633 18.9407179 26.1777585 18.9407179 27.7385507 9.50263248'/>
                                        <path
                                            d='M21.18043,11.3788718 L20.7888068,13.7471453 L21.5218889,13.7471453 C22.2341643,13.7471453 22.9082464,13.2146325 23.0202609,12.5628718 C23.1319903,11.9119316 22.6406087,11.3788718 21.9280483,11.3788718 L21.18043,11.3788718 Z M18.9558164,9.50208547 L22.8369903,9.50208547 C25.3061546,9.50208547 25.9474589,10.8665983 25.6778261,12.4961368 C25.452942,13.8573675 24.4336957,14.7656752 23.1103285,15.0886838 L25.5686618,18.9407179 L22.3863671,18.9407179 L20.5428309,15.2344615 L19.930029,18.9407179 L17.3950242,18.9407179 L18.9558164,9.50208547 L18.9558164,9.50208547 Z'
                                            id='Fill-3'/>
                                        <polyline id='Fill-4'
                                                  points='39.3145217 9.50263248 41.8492415 9.50263248 40.2887343 18.9407179 37.7537295 18.9407179 39.3145217 9.50263248'/>
                                        <polyline id='Fill-5'
                                                  points='43.7748647 9.50208547 49.3402464 9.50208547 49.0007826 11.5544615 45.9706908 11.5544615 45.7039082 13.1675897 48.5846473 13.1675897 48.2454686 15.2194188 45.3644444 15.2194188 45.0885411 16.8886154 48.1189179 16.8886154 47.7794541 18.9407179 42.2143575 18.9407179 43.7748647 9.50208547'/>
                                        <polyline id='Fill-6'
                                                  points='11.8835121 9.50208547 17.4486087 9.50208547 17.1091449 11.5544615 14.0790531 11.5544615 13.8122705 13.1675897 16.6930097 13.1675897 16.3538309 15.2194188 13.4730918 15.2194188 13.1969034 16.8886154 16.2272802 16.8886154 15.8881014 18.9407179 10.3227198 18.9407179 11.8835121 9.50208547'/>
                                        <polyline id='Fill-7'
                                                  points='32.1929082 9.50208547 37.8204251 9.50208547 37.4812464 11.5544615 34.3881643 11.5544615 34.1173913 13.1675897 36.9317198 13.1675897 36.5911159 15.2194188 33.7779275 15.2194188 33.1625604 18.9407179 30.6318309 18.9407179 32.1929082 9.50208547'/>
                                        <path
                                            d='M53.0273188,11.5544615 C53.2108744,11.5544615 53.3847391,11.5544615 53.5509082,11.5544615 C55.4885024,11.5544615 56.2458116,12.865641 56.0371739,14.1308718 C55.7561401,15.8282393 54.4846473,16.8886154 52.8229565,16.8886154 C52.6012077,16.8886154 52.3877246,16.8886154 52.1451691,16.8886154 L53.0273188,11.5544615 Z M50.8317778,9.50208547 L54.1352077,9.50208547 C58.0708213,9.50208547 58.9677923,12.3585641 58.6593961,14.2238632 C58.2184638,16.8886154 55.742744,18.9407179 52.5747005,18.9407179 L49.2712705,18.9407179 L50.8317778,9.50208547 L50.8317778,9.50208547 Z'
                                            id='Fill-9'/>
                                        <path
                                            d='M0,8.21634188 L4.68921739,8.21634188 L5.24615459,15.0733675 C8.34864251,9.9202735 11.5021498,4.96164103 14.6784589,0.0910769231 L16.2076135,0.0910769231 C12.8448986,6.31384615 9.5249372,12.5768205 6.30929469,18.9407179 L2.86677295,18.9407179 L2.02766184,11.3788718 C1.81930918,9.50208547 1.4242657,8.70536752 0,8.50352137 L0,8.21634188'
                                            id='Fill-10'/>
                                        <polyline id='Fill-12'
                                                  points='1.77541546 4.31699145 5.77344928 5.94324786 6.12089372 10.2156581 6.41646377 10.2156581 10.0456763 4.3197265 10.0456763 4.02379487 1.77484541 4.02379487 1.77541546 4.31699145'/>
                                        <path
                                            d='M18.2116184,21.1602051 L19.8522174,21.1602051 L19.2992705,24.8801368 C19.7678502,24.4460855 20.3410338,24.1777778 20.9814831,24.1777778 C22.2977246,24.1777778 23.1607778,25.3948718 22.9281981,26.8969573 C22.6956184,28.3990427 21.4546232,29.6175043 20.1383816,29.6175043 C19.4893816,29.6175043 19.0242222,29.3368889 18.7072754,28.865094 L18.6197729,29.4550427 L16.9788889,29.4550427 L18.2116184,21.1602051 Z M20.2592319,25.7011966 C20.8654783,25.7011966 21.2773382,26.2342564 21.1790048,26.8914872 C21.0809565,27.5481709 20.5100531,28.0809573 19.9040918,28.0809573 C19.2978454,28.0809573 18.8857005,27.5481709 18.9840338,26.8914872 C19.0820821,26.2342564 19.6532705,25.7011966 20.2592319,25.7011966 L20.2592319,25.7011966 Z'
                                            id='Fill-13'/>
                                        <polyline id='Fill-14'
                                                  points='23.069 24.3044103 25.0376618 24.3044103 25.9181014 26.9409915 27.6285314 24.3044103 29.5310676 24.3044103 24.5380145 32 22.6357633 32 24.7409517 28.7548718 23.069 24.3044103'/>
                                        <polyline id='Fill-15'
                                                  points='39.3136667 29.4523077 40.7556039 21.1577436 43.1147488 21.1577436 41.6728116 29.4523077 39.3136667 29.4523077'/>
                                        <path
                                            d='M37.3415845,21.1405128 C38.1692947,21.1405128 38.9967198,21.1405128 39.8241449,21.1405128 C38.621058,23.9272479 37.3367391,26.6352137 36.1464783,29.4342564 L33.618029,29.4342564 L31.5208213,22.2610598 C32.2519082,22.6713162 32.9442319,23.1887863 33.5154203,23.7880342 C33.5624493,23.8380855 33.6086232,23.8881368 33.653657,23.938735 C33.7277633,24.0213333 33.8012995,24.1039316 33.8705604,24.189265 C33.8813913,24.2021197 33.8916522,24.2149744 33.9021981,24.2275556 C34.2978116,24.7228718 34.6070628,25.2630427 34.7889082,25.8354872 L34.7475797,25.6418462 C34.7484348,25.6459487 34.75043,25.6511453 34.751285,25.6549744 L34.9972609,26.7432479 C35.8346618,24.929641 36.5284106,22.977641 37.3415845,21.1405128 Z M32.8889372,21.1418803 C33.4159469,21.1418803 33.8480435,21.3768205 33.9611981,21.9722393 L34.7889082,25.8354872 C34.055256,23.5249231 31.2523285,21.7378462 29.0322754,21.3223932 L29.0322754,21.1418803 L32.8889372,21.1418803 Z'
                                            id='Combined-Shape'/>
                                        <path
                                            d='M54.6434058,23.4384957 L53.442029,26.5225299 L55.3847536,26.5225299 L54.6434058,23.4384957 Z M58.2233092,29.4782906 C57.5030531,29.4782906 56.7827971,29.4782906 56.0625411,29.4782906 C55.9228792,29.0828034 55.8838309,28.5910427 55.7407488,28.1988376 C54.7602657,28.1988376 53.7792126,28.1988376 52.7987295,28.1988376 L52.2469227,29.4782906 C51.4194976,29.4782906 50.5917874,29.4782906 49.7643623,29.4782906 L52.982285,22.3759316 C53.1245121,22.0641368 53.3801787,21.6388376 53.4882029,21.4492991 C53.6518068,21.1621197 54.2842754,21.1405128 54.5530531,21.1405128 L56.3384444,21.1405128 L58.2233092,29.4782906 L58.2233092,29.4782906 Z'
                                            id='Fill-18'/>
                                    </g>
                                </g>
                            </g>
                        </svg>

                        <svg className={styles.mc_icon} width="63" height="22" xmlns="http://www.w3.org/2000/svg">
                            <g fill="#FFF" fillRule="evenodd" className={styles.fill_icons}>
                                <path d="M5.77 14.16a2.71 2.71 0 0 0-1.54-.45c-.75 0-1.35.15-1.35.93 0 1.39 2.72.87 2.72 3.83 0 2.7-1.8 3.4-3.43 3.4-.72 0-1.55-.24-2.17-.51l.44-1.98a2.9 2.9 0 0 0 1.73.56c.59 0 1.5-.16 1.5-1.16 0-1.57-2.73-.98-2.73-3.73 0-2.52 1.6-3.27 3.13-3.27.87 0 1.68.13 2.16.44l-.46 1.94M11.25 21.53c-.63.21-1.24.32-1.9.32-2.06 0-3.14-1.2-3.14-3.49 0-2.67 1.37-4.64 3.23-4.64 1.53 0 2.5 1.1 2.5 2.83 0 .58-.06 1.13-.22 1.92h-3.7v.25c0 .9.55 1.36 1.62 1.36.66 0 1.26-.15 1.92-.5l-.31 1.95zm-1.03-4.63v-.4c0-.63-.32-1-.87-1-.59 0-1 .5-1.18 1.4h2.05zM16.67 21.53c-.38.18-.9.3-1.64.3-1.62 0-2.63-1.6-2.63-3.53 0-2.53 1.46-4.55 3.6-4.55.46 0 1.17.2 1.73.52l-.41 1.85a2.3 2.3 0 0 0-1.24-.41c-.99 0-1.7.89-1.7 2.48 0 .92.52 1.68 1.33 1.68.48 0 .82-.1 1.24-.34l-.28 2M23.59 19.58c-.1.67-.18 1.32-.23 2.02h-1.79l.15-1.26h-.01c-.56.85-1.14 1.44-2.15 1.44-1.12 0-1.72-1.16-1.72-2.67 0-.52.03-.82.15-1.63l.5-3.6h1.99l-.54 3.61c-.05.39-.13.77-.13 1.17 0 .46.21.92.75.9.81 0 1.3-.99 1.43-2.13l.55-3.55h1.91l-.86 5.7M28.6 13.8a.73.73 0 0 0-.19-.02c-.6 0-.95.34-1.51 1.27l.16-1.18h-1.68l-1.13 7.78h1.85c.67-4.76.85-5.58 1.73-5.58h.14c.16-.93.39-1.62.7-2.25l-.07-.02M33.26 21.53c-.63.21-1.24.32-1.9.32-2.06 0-3.14-1.2-3.14-3.49 0-2.67 1.37-4.64 3.23-4.64 1.53 0 2.5 1.1 2.5 2.83 0 .58-.06 1.13-.23 1.92h-3.68l-.02.25c0 .9.55 1.36 1.63 1.36.66 0 1.26-.15 1.92-.5l-.3 1.95zm-1.04-4.63c.02-.16.02-.3.02-.4 0-.63-.33-1-.87-1-.6 0-1.01.5-1.19 1.4h2.04zM40.86 12.38l-.3 2.07a3.29 3.29 0 0 0-1.66-.52c-1.39 0-2.35 1.49-2.35 3.59 0 1.45.64 2.33 1.72 2.33.46 0 .97-.15 1.58-.5l-.32 2.2c-.69.2-1.14.27-1.64.27-2 0-3.24-1.59-3.24-4.13 0-3.42 1.71-5.81 4.17-5.81.32 0 .6.04.83.1l.76.21.45.19M44.62 17.2c0 1.77-.56 2.81-1.43 2.81-.64.02-1.03-.68-1.03-1.73 0-1.24.57-2.64 1.48-2.64.73 0 .98.76.98 1.57zm1.95.04c0-1.96-.99-3.48-2.84-3.48-2.13 0-3.5 1.85-3.5 4.58 0 1.96.8 3.56 2.82 3.56 2.04 0 3.52-1.42 3.52-4.66zM52.77 21.56h-1.74l.09-.76c-.51.6-1.04.87-1.72.87-1.35 0-2.24-1.29-2.24-3.23 0-2.59 1.39-4.78 3.02-4.78.72 0 1.27.34 1.77 1.07l.41-2.73h1.82l-1.4 9.56zm-2.73-1.83c.87 0 1.47-1.08 1.47-2.62 0-.99-.34-1.52-.98-1.52-.84 0-1.44 1.08-1.44 2.62 0 1 .32 1.52.95 1.52zM59.09 21.53c-.64.21-1.25.32-1.9.32-2.07 0-3.15-1.2-3.15-3.49 0-2.67 1.38-4.64 3.24-4.64 1.52 0 2.5 1.1 2.5 2.83 0 .58-.07 1.13-.23 1.92h-3.69l-.01.25c0 .9.55 1.36 1.62 1.36.67 0 1.26-.15 1.93-.5l-.31 1.95zm-1.04-4.63l.01-.4c0-.63-.32-1-.87-1-.6 0-1.01.5-1.18 1.4h2.04zM60.94 21.5h-.3v-1.29h-.44v-.27h1.17v.27h-.43v1.3zm1.98 0h-.28v-1.3l-.27 1.3h-.3l-.25-1.3v1.3h-.29v-1.56h.44l.26 1.23.26-1.23h.43v1.56zM8.33 9.87H6.35L7.5 2.52 4.95 9.87H3.6l-.17-7.31-1.2 7.3H.39L1.93.3h2.85l.08 5.92L6.8.3h3.08L8.33 9.87M13.44 6.4l-.45-.03c-1.12 0-1.69.4-1.69 1.19 0 .48.28.79.71.79.8 0 1.4-.8 1.43-1.95zm1.44 3.47h-1.64l.03-.81c-.5.64-1.17.94-2.08.94-1.07 0-1.8-.86-1.8-2.12 0-1.9 1.28-3 3.47-3 .23 0 .52.02.81.06.06-.26.08-.37.08-.5 0-.52-.35-.71-1.27-.71-.56 0-1.2.08-1.65.22l-.28.08-.17.05.27-1.75c1-.3 1.64-.42 2.38-.42 1.7 0 2.6.8 2.6 2.28 0 .4-.03.68-.16 1.55l-.42 2.75L15 9l-.05.4-.04.27-.02.2zM16.29 4.55c0 .98.46 1.66 1.5 2.17.8.39.93.5.93.85 0 .49-.36.71-1.14.71-.59 0-1.14-.1-1.77-.31l-.27 1.8.09.01.36.08c.12.02.29.05.52.07.47.04.83.06 1.09.06 2.08 0 3.04-.82 3.04-2.6 0-1.06-.4-1.69-1.4-2.16-.82-.39-.91-.48-.91-.84 0-.42.32-.64.96-.64.39 0 .92.05 1.42.12l.28-1.8c-.52-.08-1.28-.15-1.74-.15-2.2 0-2.97 1.2-2.96 2.63M24.1 9.77a4.4 4.4 0 0 1-1.42.26c-1.01 0-1.56-.6-1.56-1.71 0-.22.01-.45.05-.7l.13-.76.09-.62.86-5.3h1.97l-.23 1.15H25l-.27 1.89H23.7l-.52 3.25-.03.32c0 .4.2.57.67.57.23 0 .4-.02.54-.07l-.27 1.72M30.38 9.7c-.68.21-1.33.32-2.04.32-2.2 0-3.36-1.2-3.36-3.49 0-2.67 1.47-4.64 3.46-4.64 1.63 0 2.68 1.1 2.68 2.83 0 .58-.07 1.14-.25 1.92h-3.94l-.02.24c0 .91.6 1.37 1.74 1.37.71 0 1.35-.15 2.06-.5l-.33 1.95zm-1.11-4.63l.01-.4c0-.63-.35-1-.94-1-.63 0-1.08.5-1.26 1.4h2.19zM35.97 2.02a1.1 1.1 0 0 0-.2-.01c-.66 0-1.03.33-1.63 1.26l.17-1.18h-1.8L31.3 9.87h2c.7-4.76.88-5.58 1.84-5.58l.14.01c.18-.94.42-1.63.75-2.25l-.06-.03M42.54.6l-.32 2.08a3.67 3.67 0 0 0-1.77-.51c-1.48 0-2.52 1.47-2.52 3.57 0 1.46.7 2.33 1.85 2.33a3.7 3.7 0 0 0 1.68-.49l-.34 2.18c-.73.21-1.2.28-1.75.28-2.14 0-3.47-1.58-3.47-4.12C35.9 2.49 37.74.1 40.36.1c.34 0 .64.04.9.1l.8.22c.25.1.3.1.48.18M45.96 6.4l-.44-.03c-1.13 0-1.7.4-1.7 1.19 0 .48.28.79.71.79.81 0 1.4-.8 1.43-1.95zm1.44 3.47h-1.64l.04-.81c-.5.64-1.17.94-2.08.94-1.08 0-1.82-.86-1.82-2.12 0-1.9 1.29-3 3.49-3 .22 0 .51.02.8.06.07-.26.08-.37.08-.5 0-.52-.34-.71-1.27-.71a6 6 0 0 0-1.65.22l-.28.08-.17.05.28-1.75c.99-.3 1.64-.42 2.37-.42 1.7 0 2.6.8 2.6 2.28 0 .4-.03.68-.16 1.55l-.42 2.75-.06.5-.05.4-.04.27-.02.2zM52.94 2.02a1 1 0 0 0-.2-.01c-.65 0-1.03.33-1.64 1.26l.18-1.18h-1.8l-1.2 7.78h1.98c.71-4.76.9-5.58 1.85-5.58l.14.01c.18-.94.42-1.63.75-2.25l-.06-.03M58.33 9.87h-1.88l.1-.76c-.54.6-1.1.86-1.83.86-1.45 0-2.4-1.28-2.4-3.23 0-2.59 1.48-4.77 3.23-4.77.77 0 1.35.33 1.9 1.06L57.88.3h1.96l-1.51 9.57zM55.4 8.04c.93 0 1.58-1.08 1.58-2.62 0-1-.37-1.53-1.06-1.53-.9 0-1.53 1.08-1.53 2.61 0 1.02.34 1.54 1.01 1.54zM59.48 8.74c0-.68.53-1.22 1.18-1.22.66 0 1.19.54 1.19 1.22a1.2 1.2 0 0 1-1.19 1.22 1.2 1.2 0 0 1-1.18-1.22zm1.18.93c.5 0 .9-.42.9-.93s-.4-.93-.9-.93-.9.42-.9.93.4.93.9.93zm-.16-.4h-.24V8.2h.44c.09 0 .19 0 .27.06.08.06.13.16.13.27 0 .12-.07.23-.18.27l.19.48h-.27l-.16-.43h-.18v.43zm0-.6h.14c.05 0 .1 0 .15-.02.04-.03.06-.08.06-.13 0-.04-.03-.09-.06-.1-.04-.03-.11-.02-.16-.02h-.13v.27z"/>
                            </g>
                        </svg>

                        <svg className={styles.pci_icon} width='63px' height='24px' viewBox='0 0 63 24'>
                            <g id='icon' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                                <g id='Artboard-2' transform='translate(-257.000000, -30.000000)'>
                                    <g id='Group-2' transform='translate(257.000000, 30.000000)'>
                                        <g className={styles.fill_icons} id='COMPLIANT'
                                           transform='translate(40.999890, 12.198170)'>
                                            <g id='Group' transform='translate(0.000000, -0.000000)'>
                                                <path
                                                    d='M1.74671571,1.43057044 L2.36256485,1.61535256 C2.32119778,1.78679016 2.25604563,1.92999486 2.16710643,2.04497098 C2.07816723,2.15994709 1.96777053,2.24669117 1.835913,2.3052058 C1.70405547,2.36372043 1.53626282,2.3929773 1.33253001,2.3929773 C1.08536178,2.3929773 0.883441808,2.35730444 0.726764039,2.28595766 C0.57008627,2.21461087 0.434869695,2.08911427 0.321110258,1.90946409 C0.207350822,1.72981391 0.150471957,1.49986513 0.150471957,1.21961085 C0.150471957,0.845938479 0.250527051,0.558759142 0.450640242,0.358064227 C0.650753432,0.157369312 0.933855056,0.0570233601 1.29995361,0.0570233601 C1.58642055,0.0570233601 1.81160915,0.114510555 1.97552616,0.22948667 C2.13944316,0.344462785 2.26121564,0.521030599 2.34084725,0.759195409 L1.72034433,0.896242146 C1.69862662,0.827461792 1.67587507,0.777160496 1.65208901,0.74533675 C1.6127903,0.691954982 1.5647018,0.6508927 1.50782208,0.622148671 C1.45094236,0.593404642 1.38734145,0.579032844 1.31701744,0.579032844 C1.15775423,0.579032844 1.03572321,0.642679381 0.950920717,0.769974365 C0.886801762,0.864419031 0.854742765,1.01275653 0.854742765,1.2149913 C0.854742765,1.46547498 0.893006729,1.63716665 0.969535804,1.73007145 C1.04606488,1.82297626 1.15361764,1.86942797 1.29219732,1.86942797 C1.42664029,1.86942797 1.52824663,1.83195864 1.59701938,1.75701885 C1.66579213,1.68207906 1.7156904,1.57326401 1.74671571,1.43057044 Z M2.61541979,1.22577026 C2.61541979,0.857230745 2.7188359,0.570308048 2.92567124,0.364993557 C3.13250658,0.159679066 3.42052047,0.0570233601 3.78972155,0.0570233601 C4.16823022,0.0570233601 4.45986368,0.157882591 4.66463066,0.359604078 C4.86939765,0.561325566 4.9717796,0.843885396 4.9717796,1.20729204 C4.9717796,1.47112117 4.92705213,1.68746807 4.83759585,1.85633923 C4.74813957,2.0252104 4.61886942,2.15660971 4.44978153,2.25054109 C4.28069364,2.34447247 4.0699833,2.39143745 3.81764418,2.39143745 C3.56116836,2.39143745 3.34890678,2.35088845 3.18085307,2.26978922 C3.01279935,2.18869 2.87654862,2.06037037 2.77209677,1.88482648 C2.66764493,1.70928259 2.61541979,1.48959938 2.61541979,1.22577026 Z M3.31813934,1.22884996 C3.31813934,1.45674904 3.36079849,1.62048489 3.44611806,1.72006242 C3.53143764,1.81963995 3.64752223,1.86942797 3.79437532,1.86942797 C3.94536512,1.86942797 4.06222534,1.82066651 4.14495947,1.72314212 C4.22769361,1.62561774 4.26906005,1.45058976 4.26906005,1.19805294 C4.26906005,0.985552441 4.22588382,0.830285686 4.13953007,0.732248016 C4.05317632,0.634210347 3.93605756,0.585192247 3.78817029,0.585192247 C3.64648809,0.585192247 3.53273036,0.634980265 3.44689369,0.734557793 C3.36105703,0.834135321 3.31813934,0.998897729 3.31813934,1.22884996 Z M5.3425301,0.0955196347 L6.26707944,0.0955196347 L6.62386862,1.46906671 L6.97910653,0.0955196347 L7.90055336,0.0955196347 L7.90055336,2.35294118 L7.32658817,2.35294118 L7.32658817,0.631387777 L6.88137733,2.35294118 L6.36170613,2.35294118 L5.91804655,0.631387777 L5.91804655,2.35294118 L5.3425301,2.35294118 L5.3425301,0.0955196347 Z M8.3457642,0.0955196347 L9.51386094,0.0955196347 C9.76826841,0.0955196347 9.95881261,0.155573223 10.0854993,0.2756822 C10.2121859,0.395791177 10.2755283,0.566712927 10.2755283,0.788452577 C10.2755283,1.01635166 10.206498,1.19445931 10.0684354,1.32278087 C9.93037283,1.45110243 9.71966249,1.51526224 9.43629808,1.51526224 L9.05158627,1.51526224 L9.05158627,2.35294118 L8.3457642,2.35294118 L8.3457642,0.0955196347 Z M9.05158627,1.0579265 L9.22377583,1.0579265 C9.35925298,1.0579265 9.4543958,1.03457233 9.50920717,0.98786328 C9.56401853,0.941154233 9.59142381,0.881357284 9.59142381,0.80847064 C9.59142381,0.737637141 9.5676381,0.677583553 9.52006597,0.628308075 C9.47249384,0.579032597 9.3830389,0.554395228 9.25169846,0.554395228 L9.05158627,0.554395228 L9.05158627,1.0579265 Z M10.6431762,0.0955196347 L11.3458958,0.0955196347 L11.3458958,1.79705497 L12.4426347,1.79705497 L12.4426347,2.35294118 L10.6431762,2.35294118 L10.6431762,0.0955196347 Z M12.7901163,0.0955196347 L13.4943871,0.0955196347 L13.4943871,2.35294118 L12.7901163,2.35294118 L12.7901163,0.0955196347 Z M15.3977798,1.98029724 L14.5973311,1.98029724 L14.4871918,2.35294118 L13.7689597,2.35294118 L14.6237024,0.0955196347 L15.3900235,0.0955196347 L16.2447663,2.35294118 L15.5094704,2.35294118 L15.3977798,1.98029724 Z M15.2504104,1.49216448 L14.9991067,0.680663008 L14.7493543,1.49216448 L15.2504104,1.49216448 Z M16.4743524,0.0955196347 L17.1305342,0.0955196347 L17.9868282,1.34433878 L17.9868282,0.0955196347 L18.6492151,0.0955196347 L18.6492151,2.35294118 L17.9868282,2.35294118 L17.135188,1.11336113 L17.135188,2.35294118 L16.4743524,2.35294118 L16.4743524,0.0955196347 Z M18.956364,0.0955196347 L21.0924453,0.0955196347 L21.0924453,0.652945691 L20.3757645,0.652945691 L20.3757645,2.35294118 L19.6730449,2.35294118 L19.6730449,0.652945691 L18.956364,0.652945691 L18.956364,0.0955196347 Z'
                                                    id='COMPLIANT'/>
                                            </g>
                                        </g>
                                        <g id='Rectangle-3-+-Letters' transform='translate(0.000000, 0.460022)'>
                                            <path className={styles.fill_icons}
                                                  d='M34.2262971,15.4434272 L36.2795542,14.809593 L35.6147666,13.3589909 C35.1204791,13.9567537 34.6335439,14.7294708 34.2262968,15.4434274 L34.2262971,15.4434272 Z M23.0338401,16.6997809 C23.151424,17.3296893 23.4697096,18.0047607 23.9107658,18.6277998 L8.19078025,23.4805106 L0.0247710812,1.65671035 L29.5005721,0.0174940149 L33.5269587,8.8032832 C33.0703389,9.41902978 31.7021303,11.2713658 30.4133974,13.0894234 L30.4133974,7.26057901 L26.7576968,7.26057901 L26.7576968,15.0775657 C26.252207,14.7422212 25.7209898,14.5066799 25.2095451,14.4224817 L25.2095451,14.0335302 C25.2095451,14.0036707 25.1893138,13.9930751 25.1629418,14.0088023 C25.1629418,14.0088023 24.7683257,14.3195038 23.0328312,14.4852802 C22.5408548,14.5394671 22.3074499,14.5140602 22.1300845,14.4852802 C19.6694896,14.0799801 19.5523406,12.3141802 19.5523406,12.3141802 C19.5489527,12.2849682 19.5462062,12.2369566 19.5462062,12.2073836 L19.5462062,11.5309583 C19.5462062,11.5011882 19.5490113,11.4531095 19.5532473,11.4238323 C19.5532473,11.4238323 19.71961,9.53211939 22.1301885,9.33259021 L23.032945,9.33259021 C24.0977322,9.47343195 24.952915,9.98908381 24.952915,9.98908381 C24.979073,10.0041437 25.0002785,9.99184071 25.0002785,9.96232245 L25.0002785,7.59382329 C25.0002785,7.56398353 24.9793703,7.52784311 24.9520063,7.51356988 C24.9520063,7.51356988 24.4725811,7.20749807 23.0092882,7.12222433 C22.9311483,7.07988259 21.6576754,7.07365195 21.304325,7.12222433 C15.9878909,7.53979365 15.790683,11.3070526 15.790683,11.4791062 L15.790683,12.3943286 C15.790683,12.506692 15.790683,16.3583129 21.3041039,16.6998284 C21.8427477,16.7399723 22.898141,16.6998284 23.0090798,16.6998284 C23.0173498,16.6998284 23.0256033,16.6998125 23.0338401,16.6997809 Z M28.5855471,6.36543908 C29.8193729,6.36543908 30.8195863,5.44144665 30.8195863,4.30164424 C30.8195863,3.16184183 29.8193729,2.23784941 28.5855471,2.23784941 C27.3517213,2.23784941 26.3515079,3.16184183 26.3515079,4.30164424 C26.3515079,5.44144665 27.3517213,6.36543908 28.5855471,6.36543908 Z M5.65059712,16.5727383 C5.65059637,16.6024848 5.67500667,16.6265994 5.70533409,16.6265994 L9.26657149,16.6265994 C9.29680264,16.6265994 9.32130982,16.6022124 9.32130982,16.5727667 L9.32130982,13.8595133 C9.32130982,13.8297824 9.34565114,13.807196 9.37627372,13.8088536 C9.37627372,13.8088536 15.0606633,14.2116457 15.0606638,10.4741941 C15.0606634,7.52507195 11.4942692,7.20146856 10.3201087,7.25547864 C10.2964919,7.25656499 5.70624559,7.25549129 5.70624559,7.25549129 C5.67564036,7.25548428 5.65082932,7.27992433 5.65082858,7.30933991 L5.65059712,16.5727383 Z'
                                                  id='Combined-Shape' fillRule='nonzero'/>
                                            <g id='Letters' transform='translate(5.635872, 6.943732)'/>
                                            <path className={styles.fill_icons}
                                                  d='M28.6860264,21.1237061 C28.9830996,21.1237061 29.2106612,21.1237061 29.5862787,20.9604884 C30.8842615,20.2919703 35.253227,9.84145529 39.8613724,6.62703106 C39.8894561,6.60642504 39.9271159,6.57641628 39.9488956,6.54589064 C39.9791276,6.50351854 39.9803519,6.46027388 39.9803519,6.46027388 C39.9803519,6.46027388 39.9803514,6.24469544 39.2971175,6.24469544 C35.1947258,6.13517393 30.9286484,14.5583809 28.6860266,17.8910396 C28.6580158,17.92775 28.5037539,17.8910396 28.5037539,17.8910396 C28.5037539,17.8910396 27.0009603,16.1547223 25.6953913,15.4882798 C25.6681707,15.4743847 25.5196491,15.4300455 25.3655271,15.4412417 C25.262293,15.4412417 24.6550167,15.5609359 24.3720584,15.8533613 C24.0376359,16.1989728 24.0445555,16.3929376 24.0474951,16.8135132 C24.0477346,16.8477716 24.070187,16.9862782 24.1116024,17.0572104 C24.4307716,17.6038527 25.8888102,19.5673824 27.0834683,20.6506304 C27.2683301,20.779473 27.5495956,21.1237061 28.6860264,21.1237061 L28.6860264,21.1237061 Z'
                                                  id='Path-7' fillRule='nonzero'/>
                                        </g>
                                        <g className={styles.fill_icons} id='DSS'
                                           transform='translate(40.281563, 0.000000)'>
                                            <path
                                                d='M0.784401273,3.97695815 L4.16838881,3.97695815 C4.83546845,3.97695815 5.37431992,4.06679959 5.78495939,4.24648517 C6.19559886,4.42617075 6.53499986,4.68404896 6.80317258,5.02012755 C7.07134529,5.35620613 7.2657676,5.74718277 7.38644532,6.19306921 C7.50712304,6.63895565 7.567461,7.11145508 7.567461,7.61058169 C7.567461,8.39254671 7.47779209,8.99897645 7.29845159,9.42988908 C7.11911108,9.86080172 6.87021701,10.2218312 6.55176191,10.5129884 C6.23330681,10.8041456 5.89139173,10.9979702 5.5260064,11.094468 C5.02653472,11.2275684 4.57400005,11.2941176 4.16838881,11.2941176 L0.784401273,11.2941176 L0.784401273,3.97695815 Z M3.06218189,5.63405021 L3.06218189,9.63203435 L3.62031357,9.63203435 C4.09632014,9.63203435 4.43488311,9.57962684 4.63601265,9.47481025 C4.83714219,9.36999367 4.9946913,9.18698332 5.1086647,8.92577373 C5.2226381,8.66456414 5.27962395,8.24114475 5.27962395,7.65550286 C5.27962395,6.88019286 5.15224382,6.34946286 4.89747974,6.06329694 C4.64271566,5.77713102 4.22034997,5.63405021 3.63036999,5.63405021 L3.06218189,5.63405021 Z M8.36694691,8.8733657 L10.5341068,8.73860219 C10.5810371,9.08799081 10.6765722,9.35418768 10.820715,9.53720077 C11.0553661,9.83334922 11.390577,9.98142123 11.8263577,9.98142123 C12.1515171,9.98142123 12.4020872,9.9057215 12.5780755,9.75431976 C12.7540639,9.60291802 12.8420567,9.42739446 12.8420567,9.22774382 C12.8420567,9.03807571 12.758254,8.86837521 12.5906461,8.71863722 C12.4230381,8.56889924 12.0341935,8.42748216 11.4241006,8.29438173 C10.4251572,8.07143851 9.71283413,7.7752945 9.28710994,7.40594081 C8.8580336,7.03658712 8.64349864,6.56575141 8.64349864,5.99341957 C8.64349864,5.61741085 8.7532802,5.26220441 8.97284661,4.92778959 C9.19241302,4.59337476 9.52259573,4.33050535 9.96340463,4.13917349 C10.4042135,3.94784162 11.0084311,3.85217712 11.7760755,3.85217712 C12.7180322,3.85217712 13.4362215,4.02603695 13.9306649,4.37376182 C14.4251084,4.72148669 14.7192559,5.27467705 14.8131163,6.0333495 L12.6660693,6.15813052 C12.6090826,5.82870696 12.4892447,5.58912978 12.306552,5.4393918 C12.1238594,5.28965382 11.8716132,5.21478595 11.5498059,5.21478595 C11.2849854,5.21478595 11.0855349,5.27052092 10.9514485,5.38199253 C10.8173622,5.49346414 10.75032,5.62905817 10.75032,5.78877868 C10.75032,5.90524156 10.8056298,6.01005657 10.916251,6.10322687 C11.0235201,6.19972468 11.2782804,6.28956612 11.6805395,6.37275389 C12.6761307,6.58571458 13.3892918,6.80116767 13.8200442,7.01911962 C14.2507966,7.23707157 14.5642188,7.50742776 14.7603201,7.8301963 C14.9564214,8.15296484 15.0544706,8.51399434 15.0544706,8.91329563 C15.0544706,9.38247464 14.9237383,9.81504455 14.6622699,10.2110183 C14.4008015,10.6069921 14.0354217,10.9072954 13.5661194,11.1119373 C13.0968172,11.3165793 12.50517,11.4188987 11.7911602,11.4188987 C10.5374527,11.4188987 9.66925656,11.1793215 9.18654568,10.70016 C8.70383479,10.2209984 8.43063793,9.61207308 8.36694691,8.8733657 Z'/>
                                            <g id='S' transform='translate(15.209876, 0.000000)'>
                                                <path
                                                    d='M0.375657089,8.8733657 L2.54281702,8.73860219 C2.58974724,9.08799081 2.68528234,9.35418768 2.82942517,9.53720077 C3.0640763,9.83334922 3.39928717,9.98142123 3.83506783,9.98142123 C4.16022725,9.98142123 4.41079737,9.9057215 4.58678572,9.75431976 C4.76277406,9.60291802 4.85076691,9.42739446 4.85076691,9.22774382 C4.85076691,9.03807571 4.7669642,8.86837521 4.59935625,8.71863722 C4.4317483,8.56889924 4.0429037,8.42748216 3.43281077,8.29438173 C2.4338674,8.07143851 1.72154431,7.7752945 1.29582012,7.40594081 C0.866743775,7.03658712 0.65220882,6.56575141 0.65220882,5.99341957 C0.65220882,5.61741085 0.761990379,5.26220441 0.98155679,4.92778959 C1.2011232,4.59337476 1.53130591,4.33050535 1.97211481,4.13917349 C2.41292371,3.94784162 3.0171413,3.85217712 3.7847857,3.85217712 C4.72674236,3.85217712 5.44493165,4.02603695 5.93937509,4.37376182 C6.43381854,4.72148669 6.72796607,5.27467705 6.82182652,6.0333495 L4.67477945,6.15813052 C4.61779275,5.82870696 4.49795486,5.58912978 4.3152622,5.4393918 C4.13256954,5.28965382 3.88032336,5.21478595 3.5585161,5.21478595 C3.29369554,5.21478595 3.09424508,5.27052092 2.96015872,5.38199253 C2.82607236,5.49346414 2.75903019,5.62905817 2.75903019,5.78877868 C2.75903019,5.90524156 2.81433998,6.01005657 2.92496123,6.10322687 C3.03223031,6.19972468 3.28699057,6.28956612 3.68924965,6.37275389 C4.68484085,6.58571458 5.39800197,6.80116767 5.8287544,7.01911962 C6.25950682,7.23707157 6.57292898,7.50742776 6.76903028,7.8301963 C6.96513158,8.15296484 7.06318076,8.51399434 7.06318076,8.91329563 C7.06318076,9.38247464 6.93244852,9.81504455 6.67098012,10.2110183 C6.40951173,10.6069921 6.04413188,10.9072954 5.57482963,11.1119373 C5.10552737,11.3165793 4.51388019,11.4188987 3.79987034,11.4188987 C2.54616289,11.4188987 1.67796674,11.1793215 1.19525585,10.70016 C0.712544966,10.2209984 0.439348109,9.61207308 0.375657089,8.8733657 Z'
                                                    id='S'/>
                                            </g>
                                        </g>
                                        <path className={styles.fill_icons}
                                              d='M9.25788144,12.1965936 L9.25788144,9.75205238 L10.1293579,9.75205238 C10.1293579,9.75205238 11.3966122,9.80792762 11.4952741,10.6523651 C11.5183125,10.7183435 11.5127564,11.1316928 11.495147,11.154474 C11.331885,12.1481515 10.2308842,12.1967967 10.2308842,12.1967967 L9.25788144,12.1965936 L9.25788144,12.1965936 Z'
                                              id='Path-1-path'/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>

                <p className={styles.copyright}>
                    {locale['footer.copyright.text']}
                </p>
                {/*<a href='' className={styles.offer}>*/}
                    {/*{locale['footer.offer.label']}*/}
                    {/*<hr/>*/}
                {/*</a>*/}
            </footer>
        );
    }
}

export const Footer = connect(mapStateToProps)(FooterDef);
