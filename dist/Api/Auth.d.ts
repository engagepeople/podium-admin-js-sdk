import { ILogoutResponse, IPodiumPromise, IUser } from '../../types';
import { Resource } from '../Podium/Resource';
import { Settings } from '../Podium/Settings';
export declare class Auth extends Resource {
    constructor(settings: Settings);
    Login(username: string, password: string): IPodiumPromise<IUser | undefined>;
    Logout(): IPodiumPromise<ILogoutResponse>;
}
