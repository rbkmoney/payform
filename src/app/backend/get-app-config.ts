import { AppConfig } from './app-config';

export function getAppConfig(): Promise<AppConfig> {
    return fetch('../appConfig.json', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then((response) => response.json());
}
