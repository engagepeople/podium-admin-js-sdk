import { AxiosRequestConfig } from 'axios';
import { IAuthResponse, IPodiumPromise, ISettings } from '../../types';
import { Token } from './Token';
export declare class PodiumRequest extends Token {
    private settings;
    constructor(settings: ISettings);
    protected GetRequest<T>(resource: string, params?: object): IPodiumPromise<T>;
    protected PostRequest<T>(resource: string, data?: object): IPodiumPromise<T>;
    protected AuthenticateRequest(username: string, password: string): IPodiumPromise<IAuthResponse>;
    protected Request<T>(resource: string, config: AxiosRequestConfig): IPodiumPromise<T>;
    private makeUrl(path);
    private makeHeaders();
    private catchError(error);
}
