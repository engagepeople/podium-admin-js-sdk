import {API_CODE, IAuthResponse, ILogoutResponse, IPodiumPromise, ISettings, IUser} from '../../types'
import {Resource} from '../Podium/Resource'
import {Settings} from '../Podium/Settings'

export class Auth extends Resource {

    constructor(settings: Settings) {
        super(settings)
    }

    public Login(username: string, password: string): IPodiumPromise<IUser | undefined> {
        this.SetResource('authenticate')
        return this.PostRequest<IAuthResponse>({
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

    public Logout(): IPodiumPromise<ILogoutResponse> {
        this.SetResource('logout')
        return this.PostRequest<ILogoutResponse>().then((rsp) => {
            this.RemoveToken()
            return rsp
        })
    }
}
