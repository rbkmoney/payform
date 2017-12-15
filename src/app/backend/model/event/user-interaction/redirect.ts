import { UserInteraction } from './user-interaction';
import { BrowserRequest } from './browser-request';

export class Redirect extends UserInteraction {
    request: BrowserRequest;
}
