"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ConvertTime_1 = require("./ConvertTime");
const Filter_1 = require("./Filter");
const Token_1 = require("./Token");
const Paginator_1 = require("./Paginator");
class Request extends Token_1.Token {
    constructor(settings) {
        super();
        this.Legacy = false;
        this.settings = settings;
    }
    static parseError(error) {
        if (error.response) {
            const message = (typeof error.response.data === 'object' &&
                (error.response.data.message
                    || (error.response.data.detail && Object.values(error.response.data.detail)
                        .map((errorDetail) => (typeof errorDetail === 'string' && errorDetail)))
                    || Object.values(error.response.data)[0])) || error.response;
            return {
                code: error.response.data.code,
                data: error.response.data,
                message,
                status: error.response.status,
                statusText: error.response.statusText,
            };
        }
        else {
            // todo: fix this
            // AxiosError might not have .response, so i had to add if and else part i came up with randomly
            return {
                code: 'Wrong Error response',
                data: {},
                message: 'Wrong Error response',
                status: 500,
                statusText: 'Wrong error',
            };
        }
    }
    GetRequest(id) {
        const request = {
            method: 'get',
        };
        return this.Request(request, `${this.makeURL()}/${id}`);
    }
    DeleteRequest(id) {
        const request = {
            method: 'delete',
        };
        return this.Request(request, this.makeURL(id));
    }
    ListRequest(filter, paginator) {
        let params = {};
        if (filter instanceof Filter_1.Filter) {
            filter.setLegacyMode(this.Legacy);
            params = Object.assign(params, filter.toParams());
        }
        if (paginator instanceof Paginator_1.Paginator) {
            paginator.setLegacyMode(this.Legacy);
            params = Object.assign(params, paginator.toParams());
        }
        const request = {
            method: 'get',
            params,
        };
        return this.Request(request, this.makeURL());
    }
    PostRequest(data = {}) {
        const request = {
            data,
            method: 'post',
        };
        return this.Request(request, this.makeURL());
    }
    UpdateRequest(id, data) {
        const request = {
            data,
            method: 'put',
        };
        return this.Request(request, this.makeURL(id));
    }
    Request(config, url) {
        if (!url) {
            url = this.makeURL();
        }
        if ((this.Resource !== 'authenticate') && !this.HasToken()) { // Don't even make the request
            return new Promise((resolve, reject) => {
                reject("unauthorized" /* INVALID_TOKEN */);
            });
        }
        if (typeof config.data === 'object') {
            const convertTimeToAPI = new ConvertTime_1.ConvertTime(config.data);
            config.data = convertTimeToAPI.ToAPI();
        }
        config = Object.assign({
            headers: this.makeHeaders(),
            transformResponse: [(data) => {
                    const convertTimeToUTC = new ConvertTime_1.ConvertTime(JSON.parse(data));
                    return convertTimeToUTC.ToUTC();
                }],
        }, config);
        return new Promise((resolve, reject) => {
            // @ts-ignore
            return axios_1.default(url, config)
                .then((response) => {
                resolve(response.data);
            })
                .catch((error) => {
                const parsedError = Request.parseError(error);
                if (parsedError
                    && (parsedError.status === 401)
                    && (parsedError.code === "unauthorized" /* INVALID_TOKEN */)) {
                    Token_1.Token.getInstance().RemoveToken();
                }
                this.onRequestError(parsedError);
                reject(parsedError);
            });
        });
    }
    makeURL(id, postfix) {
        let endpoint = this.settings.getEndpoint();
        if (!endpoint.endsWith('/')) {
            endpoint += '/';
        }
        const version = this.settings.getVersion();
        const resource = this.ResourceOnce || this.Resource;
        // this.ResourceOnce = null
        let build = `${endpoint}v${version}/${resource}`;
        if (id) {
            build += `/${id}`;
        }
        if (postfix) {
            build += `/${postfix}`;
        }
        return build;
    }
    makeHeaders() {
        return {
            Authentication: this.GetToken(),
        };
    }
    onRequestError(errorData) {
        this.settings.getOnRequestError()(errorData);
    }
}
exports.Request = Request;
