import { IPodiumList, IPodiumPromise } from '../../types';
import { Request } from './Request';
import { Filter } from './Filter';
import { Paginator } from './Paginator';
import { Settings } from '../Podium/Settings';
export declare class Resource extends Request {
    constructor(settings: Settings);
    SetResource(resource: string): Resource;
    SetLegacy(legacy: boolean): Resource;
    Get<T>(id: number | string): IPodiumPromise<T>;
    List<F, T>(arg1?: Filter<F> | Paginator, paginator?: Paginator): IPodiumPromise<IPodiumList<T>>;
    Create<T>(params?: object): IPodiumPromise<T>;
    Update<T>(id: number | string, params: object): IPodiumPromise<T>;
    Delete<T>(id: number | string): IPodiumPromise<T>;
}
