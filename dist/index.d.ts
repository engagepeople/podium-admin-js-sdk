import { Auth } from './Api/Auth';
import { Resource } from './Podium/Resource';
import { Settings } from './Podium/Settings';
export declare class Podium {
    Auth: Auth;
    Profile: Resource;
    Campaigns: {
        Flex: {
            Flex: Resource;
            Issue: {
                File: Resource;
                FileError: Resource;
                Manual: Resource;
            };
            Rule: Resource;
        };
        Incentive: Resource;
    };
    Product: {
        Catalog: Resource;
        Filterable: Resource;
        Product: Resource;
    };
    Program: Resource;
    Currency: Resource;
    Rewards: Resource;
    Segments: Resource;
    Shop: Resource;
    LRG: {
        Configuration: Resource;
    };
    Terms: {
        Latest: Resource;
        Terms: Resource;
    };
    Users: Resource;
    SSO: {
        Attributes: Resource;
    };
    constructor(settings: Settings);
}
export { Settings as PodiumSettings } from './Podium/Settings';
export { Paginator as PodiumPaginator } from './Podium/Paginator';
export { Filter as PodiumFilter } from './Podium/Filter';
