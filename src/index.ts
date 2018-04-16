import {ISettings} from '../types'
import {Auth} from './Api/AdminAuth'
import {Users} from './Api/AdminUsers'
import {Flex} from './Api/Campaigns/Flex'
import {Incentive} from './Api/Campaigns/Incentive'
import {Rewards} from './Api/Rewards'
import {Paginator} from './Podium/Paginator'

export default class Podium {
    private Auth: Auth
    private Users: Users
    private Rewards: Rewards
    private Campaigns: { Flex: Flex, Incentive: Incentive }
    private Paginator: Paginator

    constructor(settings: ISettings) {
        this.Auth = new Auth(settings)
        this.Campaigns = {
            Flex: new Flex(settings),
            Incentive: new Incentive(settings),
        }
        this.Users = new Users(settings)
        this.Rewards = new Rewards(settings)
        // this.Users = new Users(settings)
        this.Paginator = new Paginator()
    }
}
