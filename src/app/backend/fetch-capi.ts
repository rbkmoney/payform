function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function guid() {
    return `${s4()}${s4()}-${s4()}${s4()}`;
}

export class FetchCapiParams {
    endpoint: string;
    accessToken: string;
    method?: 'GET' | 'POST' | 'PUT';
    body?: any;
}

export function fetchCapi<T>(param: FetchCapiParams): Promise<T> {
    return fetch(param.endpoint, {
        method: param.method || 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${param.accessToken}`,
            'X-Request-ID': guid()
        },
        body: param.body ? JSON.stringify(param.body) : undefined
    }).then((response) => response.json());
}
