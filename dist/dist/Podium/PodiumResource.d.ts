import { IPodiumPromise, ISettings } from '../../types';
import { PodiumRequest } from './PodiumRequest';
export declare class PodiumResource extends PodiumRequest {
    resource: string;
    constructor(resource: string, settings: ISettings);
    Create<T>(params?: object): IPodiumPromise<T>;
    List<T>(params?: object): IPodiumPromise<T>;
}
