import {ILogoutResponse, IPodiumPromise, ISettings, IUser} from '../../types'
import {PodiumResource} from '../Podium/PodiumResource'

export class Auth extends PodiumResource {

    constructor(settings: ISettings) {
        super(settings)
        super.Resource = 'logout'
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
        return super.PostRequest<ILogoutResponse>().then((rsp) => {
            super.RemoveToken()
            return rsp
        })
    }
}
