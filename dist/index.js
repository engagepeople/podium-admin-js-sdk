"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("./Api/Auth");
const Resource_1 = require("./Podium/Resource");
class Podium {
    constructor(settings) {
        this.Auth = new Auth_1.Auth(settings);
        this.Profile = new Resource_1.Resource(settings).SetResource('profile');
        this.Campaigns = {
            Flex: {
                Flex: new Resource_1.Resource(settings).SetResource('admin/adhoc_campaign'),
                Issue: {
                    File: new Resource_1.Resource(settings).SetResource('admin/adhoc_file'),
                    FileError: new Resource_1.Resource(settings).SetResource('admin/adhoc_file_errors'),
                    Manual: new Resource_1.Resource(settings).SetResource('admin/adhoc_manual'),
                },
                Rule: new Resource_1.Resource(settings).SetResource('admin/adhoc_campaign_rule'),
            },
            Incentive: new Resource_1.Resource(settings).SetResource('admin/incentive_campaign'),
        };
        this.Product = {
            Catalog: new Resource_1.Resource(settings).SetResource('admin/catalog'),
            Filterable: new Resource_1.Resource(settings).SetResource('admin/productFilterable'),
            Product: new Resource_1.Resource(settings).SetResource('admin/product'),
        };
        this.Program = new Resource_1.Resource(settings).SetResource('program'),
            this.Currency = new Resource_1.Resource(settings).SetResource('admin/currency'),
            this.Shop = new Resource_1.Resource(settings).SetResource('admin/catalog'),
            this.LRG = {
                Configuration: new Resource_1.Resource(settings).SetResource('lrg/configurations'),
            };
        this.Rewards = new Resource_1.Resource(settings).SetResource('admin/reward').SetLegacy(true);
        this.Segments = new Resource_1.Resource(settings).SetResource('group').SetLegacy(true);
        this.Terms = {
            Latest: new Resource_1.Resource(settings).SetResource('admin/terms_latest'),
            Terms: new Resource_1.Resource(settings).SetResource('admin/terms'),
        };
        this.Users = new Resource_1.Resource(settings).SetResource('user').SetLegacy(true);
        this.SSO = {
            Attributes: new Resource_1.Resource(settings).SetResource('samlattributes'),
        };
    }
}
exports.Podium = Podium;
var Settings_1 = require("./Podium/Settings");
exports.PodiumSettings = Settings_1.Settings;
var Paginator_1 = require("./Podium/Paginator");
exports.PodiumPaginator = Paginator_1.Paginator;
var Filter_1 = require("./Podium/Filter");
exports.PodiumFilter = Filter_1.Filter;
