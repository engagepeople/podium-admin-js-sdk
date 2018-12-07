"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resource_1 = require("../Podium/Resource");
class Auth extends Resource_1.Resource {
    constructor(settings) {
        super(settings);
    }
    Login(username, password) {
        this.SetResource('authenticate');
        return this.PostRequest({
            password,
            type: 'system',
            user_account: username,
        }).then((response) => {
            if (response.apiCode === "SYSTEM_ACCOUNT_FOUND" /* SYSTEM_ACCOUNT_FOUND */) {
                this.SetToken(response.token);
                return response.detail;
            }
        });
    }
    Logout() {
        this.SetResource('logout');
        return this.PostRequest().then((rsp) => {
            this.RemoveToken();
            return rsp;
        });
    }
}
exports.Auth = Auth;
