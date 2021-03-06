import { guid } from 'checkout/utils';

export class FetchCapiParams {
    endpoint: string;
    accessToken: string;
    method?: 'GET' | 'POST' | 'PUT';
    body?: any;
}

export function fetchCapi<T>(param: FetchCapiParams): Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(param.endpoint, {
            method: param.method || 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${param.accessToken}`,
                'X-Request-ID': guid()
            },
            body: param.body ? JSON.stringify(param.body) : undefined
        })
            .then((res) =>
                res.status >= 200 && res.status <= 300
                    ? resolve(res.json())
                    : res
                          .json()
                          .then((ex) => reject(ex))
                          .catch(() => reject({ code: res.status }))
            )
            .catch((ex) => reject({ code: `${ex}` }));
    });
}
