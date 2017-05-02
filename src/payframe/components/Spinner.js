import React from 'react';

class Spinner extends React.Component {

    componentDidMount() {
        this.spinner.style.transform = 'scale(0.54)';
        Spinner.setStyle(this.deg0.style, 0);
        Spinner.setStyle(this.deg30.style, 30);
        Spinner.setStyle(this.deg60.style, 60);
        Spinner.setStyle(this.deg90.style, 90);
        Spinner.setStyle(this.deg120.style, 120);
        Spinner.setStyle(this.deg150.style, 150);
        Spinner.setStyle(this.deg180.style, 180);
        Spinner.setStyle(this.deg210.style, 210);
        Spinner.setStyle(this.deg240.style, 240);
        Spinner.setStyle(this.deg270.style, 270);
        Spinner.setStyle(this.deg300.style, 300);
        Spinner.setStyle(this.deg330.style, 330);
    }

    static setStyle(style, degree) {
        return Object.assign(style, {
            top: '80px',
            left: '93px',
            width: '14px',
            height: '40px',
            background: '#00b2ff',
            '-webkit-transform': `rotate(${degree}deg) translate(0,-60px)`,
            transform: `rotate(${degree}deg) translate(0,-60px)`,
            'border-radius': '10px',
            position: 'absolute'
        })
    }

    render() {
        return <div className="spinner" ref={(spinner) => { this.spinner = spinner; }}>
            <div ref={(deg0) => { this.deg0 = deg0; }}></div>
            <div ref={(deg30) => { this.deg30 = deg30; }}></div>
            <div ref={(deg60) => { this.deg60 = deg60; }}></div>
            <div ref={(deg90) => { this.deg90 = deg90; }}></div>
            <div ref={(deg120) => { this.deg120 = deg120; }}></div>
            <div ref={(deg150) => { this.deg150 = deg150; }}></div>
            <div ref={(deg180) => { this.deg180 = deg180; }}></div>
            <div ref={(deg210) => { this.deg210 = deg210; }}></div>
            <div ref={(deg240) => { this.deg240 = deg240; }}></div>
            <div ref={(deg270) => { this.deg270 = deg270; }}></div>
            <div ref={(deg300) => { this.deg300 = deg300; }}></div>
            <div ref={(deg330) => { this.deg330 = deg330; }}></div>
        </div>
    }
}

export default Spinner;
