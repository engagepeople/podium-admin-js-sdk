import {IAuthResponse, ILogoutResponse, IPodiumPromise, IResponse, ISettings, IUser} from '../../types'
import {PodiumResource} from '../Podium/PodiumResource'

export class Auth extends PodiumResource {

    constructor(settings: ISettings) {
        super('logout', settings)
    }

    public Login(username: string, password: string): IPodiumPromise<IUser> {
        return super.AuthenticateRequest(username, password)
    }

    public GetToken(): string {
        return super.GetToken()
    }

    public SetToken(token: string): string {
        return super.SetToken(token)
    }

    public HasToken(): boolean {
        return super.HasToken()
    }

    public Logout(): IPodiumPromise<ILogoutResponse> {
        return super.PostRequest<ILogoutResponse>(this.resource).then((rsp) => {
            super.RemoveToken()
            return rsp
        })
    }
}
