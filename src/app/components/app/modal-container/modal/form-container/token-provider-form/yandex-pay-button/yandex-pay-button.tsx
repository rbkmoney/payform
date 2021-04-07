import * as React from 'react';
import styled from 'checkout/styled-components';

const YandexPayButtonWrapper = styled.div`
    margin-top: 20px;

    & > * {
        width: 100%;
    }
`;

export class YandexPayButton extends React.Component<
    Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'>
> {
    private yaPayButton: YaPay.Button;
    private isDestroyed = false;

    componentWillMount() {
        this.yaPayButton = YaPay.Button.create({
            type: YaPay.ButtonType.Simple,
            theme: YaPay.ButtonTheme.Black,
            width: YaPay.ButtonWidth.Auto
        });
    }

    componentWillUnmount() {
        this.yaPayButton.destroy();
        this.isDestroyed = true;
    }

    render() {
        return <YandexPayButtonWrapper {...this.props} id="yandex-pay-button" ref={this.mount} />;
    }

    private mount = (el: HTMLElement) => {
        if (!this.isDestroyed) {
            this.yaPayButton.unmount();
            this.yaPayButton.mount(el);
        }
    };
}
