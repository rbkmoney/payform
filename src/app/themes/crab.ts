import Theme from './theme';

const theme: Theme = {
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
            0.9: '#ff8454',
            1: '#d1658e'
        },
        secondary: { 1: '#8330ec' },
        error: { 1: '#e75542' },
        warning: { 1: '#ffe05c' },
        info: { 1: '#00f' },
        success: { 1: '#00ff00' }
    },
    font: {
        family: "'Roboto', sans-serif"
    }
} as any;

export default theme;
