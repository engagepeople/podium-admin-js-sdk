"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("./Request");
const Filter_1 = require("./Filter");
const Paginator_1 = require("./Paginator");
class Resource extends Request_1.Request {
    constructor(settings) {
        super(settings);
    }
    SetResource(resource) {
        this.Resource = resource;
        return this;
    }
    SetLegacy(legacy) {
        this.Legacy = legacy;
        return this;
    }
    Get(id) {
        return this.GetRequest(id);
    }
    List(arg1, paginator) {
        let filter;
        if (arg1 instanceof Paginator_1.Paginator) {
            if (paginator) {
                throw new TypeError('Order of parameters passed into List method must be Filter then Paginator');
            }
            paginator = arg1;
            filter = undefined;
        }
        else if (arg1 instanceof Filter_1.Filter) {
            filter = arg1;
        }
        return this.ListRequest(filter, paginator);
    }
    Create(params) {
        return this.PostRequest(params);
    }
    Update(id, params) {
        return this.UpdateRequest(id, params);
    }
    Delete(id) {
        return this.DeleteRequest(id);
    }
}
exports.Resource = Resource;
