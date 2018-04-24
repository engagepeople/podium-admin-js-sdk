import {API_CODE, IAuthResponse, ILogoutResponse, IPodiumPromise, ISettings, IUser} from '../../types'
import {Resource} from '../Podium/Resource'

export class Auth extends Resource {

    constructor(settings: ISettings) {
        super(settings)
    }

    public Login(username: string, password: string): IPodiumPromise<IUser> {
        super.SetResource('authenticate')
        return super.PostRequest<IAuthResponse>({
            password,
            type: 'system',
            user_account: username,
        }).then((response) => {
            if (response.apiCode === API_CODE.SYSTEM_ACCOUNT_FOUND) {
                this.SetToken(response.token)
                return response.detail
            }
        })
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
        super.SetResource('logout')
        return super.PostRequest<ILogoutResponse>().then((rsp) => {
            super.RemoveToken()
            return rsp
        })
    }
}
