import { ILogoutResponse, IPodiumPromise, IResponse, ISettings } from '../../types';
import { PodiumResource } from '../Podium/PodiumResource';
export declare class Auth extends PodiumResource {
    constructor(settings: ISettings);
    Login(username: string, password: string): IPodiumPromise<IResponse>;
    GetToken(): string;
    SetToken(token: string): string;
    HasToken(): boolean;
    Logout(): IPodiumPromise<ILogoutResponse>;
}
