import * as React from 'react';

interface IProps {
    icon: string;
    className?: string;
}

export class Icon extends React.Component<IProps, {}> {
    render() {
        return (
            <svg {...this.props}
                dangerouslySetInnerHTML={{__html: `<use xlink:href="assets/icons/${this.props.icon}.svg#icon" />`}}
            />
        );
    }
}
