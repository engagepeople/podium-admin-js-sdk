// tslint:disable:max-classes-per-file
import {ISettings} from '../types'
import {Auth} from './Api/AdminAuth'
import {Users} from './Api/AdminUsers'
import {Flex} from './Api/Campaigns/Flex'
import {Incentive} from './Api/Campaigns/Incentive'
import {Rewards} from './Api/Rewards'
import {PodiumResource} from './Podium/PodiumResource'

export class Podium {
    private Auth: Auth
    private Users: Users
    private Rewards: Rewards
    private Campaigns: { Flex: Flex, Incentive: Incentive }

    constructor(settings: ISettings) {
        this.Auth = new Auth(settings)
        this.Campaigns = {
            Flex: new Flex(settings),
            Incentive: new Incentive(settings),
        }
        this.Users = new Users(settings)
        this.Rewards = new PodiumResource(settings)
    }
}

export { Paginator as PodiumPaginator } from './Podium/Paginator'
export { Filter as PodiumFilter } from './Podium/Filter'
