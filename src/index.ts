import {ISettings} from '../types'
import {Auth} from './Api/Auth'
import {Flex} from './Api/Campaigns/Flex'
import {Rewards} from './Api/Rewards'
import {Users} from './Api/Users'
import {Paginator} from './Podium/Paginator'

export default class Podium {
    private Auth: Auth
    private Rewards: Rewards
    private Campaigns: { Flex: Flex }
    private Paginator: Paginator
    private Users: Users

    constructor(settings: ISettings) {
        this.Auth = new Auth(settings)
        this.Campaigns = {
            Flex: new Flex(settings),
        }
        this.Rewards = new Rewards(settings)
        this.Users = new Users(settings)
        this.Paginator = new Paginator()
    }
}
