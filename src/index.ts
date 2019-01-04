// tslint:disable:max-classes-per-file
import {ISettings} from '../types'
import {Auth} from './Api/Auth'
import {Request} from './Podium/Request'
import {Resource} from './Podium/Resource'
import {Settings} from './Podium/Settings'

export class Podium {
    public Auth: Auth
    public Profile: Resource
    public Campaigns: {
        Flex: {
            Flex: Resource
            Issue: {
                File: Resource
                FileError: Resource
                Manual: Resource,
            }
            Rule: Resource,
        },
        Incentive: Resource,
    }
    public Product: {
        Catalog: Resource,
        Filterable: Resource,
        Product: Resource,
    }
    public Program: Resource
    public Currency: Resource
    public Rewards: Resource
    public Segments: Resource
    public Shop: Resource
    public LRG: {
        Configuration: Resource,
    }
    public Terms: {
        Latest: Resource
        Terms: Resource,
    }
    public Users: Resource
    public SSO: {
        Attributes: Resource,
    }
    constructor(settings: Settings) {
        this.Auth = new Auth(settings)
        this.Profile = new Resource(settings).SetResource('profile')
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
        this.Product = {
            Catalog: new Resource(settings).SetResource('admin/catalog'),
            Filterable: new Resource(settings).SetResource('admin/productFilterable'),
            Product: new Resource(settings).SetResource('admin/product'),
        }
        this.Program =  new Resource(settings).SetResource('program'),
        this.Currency =  new Resource(settings).SetResource('admin/currency'),
        this.Shop =  new Resource(settings).SetResource('admin/catalog'),
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
        this.SSO = {
            Attributes: new Resource(settings).SetResource('samlattributes'),
        }
    }
}

export {Settings as PodiumSettings} from './Podium/Settings'
export {Paginator as PodiumPaginator} from './Podium/Paginator'
export {Filter as PodiumFilter} from './Podium/Filter'
