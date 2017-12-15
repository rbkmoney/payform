import { RequestType } from './request-type';

export abstract class BrowserRequest {
    requestType: RequestType;
    uriTemplate: string;
}
