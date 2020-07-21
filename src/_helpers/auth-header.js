import {getAccessToken} from './accessToken'

export function authHeader() {
    const accessToken = getAccessToken();
    if (accessToken) {
        return {'Authorization': `Bearer ${accessToken}`};
    } else {
        return '';
    }
}