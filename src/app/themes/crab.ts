import Theme from './theme';

const theme: Theme = {
    name: 'crab',
    color: {
        neutral: {
            0: '#fff',
            0.2: '#bababa',
            0.3: '#afafaf',
            0.8: '#333',
            0.9: '#292929',
            1: '#000'
        },
        primary: {
            0.1: '#ff8454',
            1: '#d1658e',
            1.1: '#d1658e',
            1.2: '#d1658e'
        },
        secondary: {
            1: '#8330ec',
            0.9: '#8330ec',
            0.7: '#8330ec',
            1.1: '#8330ec'
        },
        error: {
            1: '#e75542'
        },
        warning: {
            1: '#ffe05c'
        },
        info: {},
        success: {}
    },
    font: {
        family: "'Roboto', sans-serif"
    }
};

export default theme;
