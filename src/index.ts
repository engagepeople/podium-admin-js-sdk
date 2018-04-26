// tslint:disable:max-classes-per-file
import {ISettings} from '../types'
import {Auth} from './Api/Auth'
import {Request} from './Podium/Request'
import {Resource} from './Podium/Resource'

export class Podium {
    public Auth: Auth
    public Campaigns: {
        Flex: {
            Flex: Request
            Issue: {
                File: Request
                FileError: Request
                Manual: Request,
            }
            Rule: Request,
        },
        Incentive: Request,
    }
    public Currency: Request
    public Rewards: Request
    public Segments: Request
    public LRG: {
        Configuration: Request,
    }
    public Terms: {
        Latest: Request
        Terms: Request,
    }
    public Users: Request

    constructor(settings: ISettings) {
        this.Auth = new Auth(settings)
        this.Campaigns = {
            Flex: {
                Flex: new Resource(settings).SetResource('admin/adhoc_campaign'),
                Issue: {
                    File: new Resource(settings).SetResource('admin/adhoc_file'),
                    FileError: new Resource(settings).SetResource('admin/adhoc_file_errors'),
                    Manual: new Resource(settings).SetResource('admin/adhoc_manual'),
                },
                Rule: new Resource(settings).SetResource('admin/adhoc_campaign_rule'),
            },
            Incentive: new Resource(settings).SetResource('admin/incentive_campaign'),
        }
        this.Currency =  new Resource(settings).SetResource('admin/currency'),
        this.LRG = {
            Configuration: new Resource(settings).SetResource('lrg/configurations'),
        }
        this.Rewards = new Resource(settings).SetResource('admin/reward').SetLegacy(true)
        this.Segments = new Resource(settings).SetResource('group').SetLegacy(true)
        this.Terms = {
            Latest: new Resource(settings).SetResource('admin/terms_latest'),
            Terms: new Resource(settings).SetResource('admin/terms'),
        }
        this.Users = new Resource(settings).SetResource('user').SetLegacy(true)
    }
}

export {Paginator as PodiumPaginator} from './Podium/Paginator'
export {Filter as PodiumFilter} from './Podium/Filter'
