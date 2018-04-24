// tslint:disable:max-classes-per-file
import {ISettings} from '../types'
import {Auth} from './Api/Auth'
import {Request} from './Podium/Request'
import {Resource} from './Podium/Resource'

export class Podium {
    private Auth: Auth
    private Users: Request
    private Rewards: Request
    private Campaigns: { Flex: Request, Incentive: Request }

    constructor(settings: ISettings) {
        this.Auth = new Auth(settings)
        this.Campaigns = {
            Flex: new Resource(settings).SetResource('admin/adhoc_campaign'),
            Incentive: new Resource(settings).SetResource('admin/incentive'),
        }
        this.Users = new Resource(settings).SetResource('user').SetLegacy(true)
        this.Rewards = new Resource(settings).SetResource('admin/reward').SetLegacy(true)
    }
}

export { Paginator as PodiumPaginator } from './Podium/Paginator'
export { Filter as PodiumFilter } from './Podium/Filter'
