import { AppConfig } from './app-config';

export const getAppConfig = (): Promise<AppConfig> => (
    fetch('../appConfig.json', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then((response) => response.json())
);
