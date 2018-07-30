import { guid } from 'checkout/utils';

export class FetchWrapperParams {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT';
    body?: any;
}

export async function fetchWrapper<T>(param: FetchWrapperParams): Promise<T> {
    try {
        const res = await fetch(param.endpoint, {
            method: param.method || 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Request-ID': guid()
            },
            body: param.body ? JSON.stringify(param.body) : undefined
        });
        if (res.status >= 200 && res.status <= 300) {
            return await res.json();
        } else {
            throw {code: res.status};
        }
    } catch (e) {
        throw e;
    }
}
