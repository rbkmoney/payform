module.exports = {
    transform: {
        '^.+\\.js?$': 'babel-jest',
        '^.+\\.ts(x)?$': 'ts-jest'
    },
    testMatch: ['<rootDir>/src/**/?(*.)(spec|test).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^.+\\.scss$': 'identity-obj-proxy',
        '^checkout/(.*)': '<rootDir>/src/app/$1'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)']
};
