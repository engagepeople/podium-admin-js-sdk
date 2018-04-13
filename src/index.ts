import {ISettings} from '../types'
import {Auth} from './api/Auth'
import {Flex} from './api/Flex'
import {Users} from './api/Users'
import {Paginator} from './Podium/Paginator'

export default class Podium {
    private Auth: Auth
    private Users: Users
    private Paginator: Paginator
    private Campaigns: { Flex: Flex }

    constructor(settings: ISettings) {
        this.Auth = new Auth(settings)
        this.Users = new Users(settings)
        this.Campaigns = {
            Flex: new Flex(settings),
        }
        this.Paginator = new Paginator()
    }
}
