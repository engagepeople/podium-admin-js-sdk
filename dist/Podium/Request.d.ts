import { AxiosRequestConfig } from 'axios';
import { IPodiumPromise } from '../../types';
import { Filter } from './Filter';
import { Token } from './Token';
import { Paginator } from './Paginator';
import { Settings } from './Settings';
export declare class Request extends Token {
    private static parseError;
    protected Legacy: boolean;
    protected ResourceOnce: string;
    protected Resource: string;
    private settings;
    constructor(settings: Settings);
    protected GetRequest<T>(id: number | string): IPodiumPromise<T>;
    protected DeleteRequest<T>(id: number | string): IPodiumPromise<T>;
    protected ListRequest<F, T>(filter?: Filter<F>, paginator?: Paginator): IPodiumPromise<T>;
    protected PostRequest<T>(data?: object): IPodiumPromise<T>;
    protected UpdateRequest<T>(id: number | string, data: object): IPodiumPromise<T>;
    protected Request<T>(config: AxiosRequestConfig, url?: string): IPodiumPromise<T>;
    protected makeURL(id?: number | string, postfix?: string): string;
    private makeHeaders;
    private onRequestError;
}
