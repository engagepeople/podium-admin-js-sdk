"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LOCAL_STORAGE_KEY = '__podiumAdminSDK__';
class Token {
    constructor() {
        this.token = null;
        // if (Token.instance) {
        //     throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.')
        // }
        Token.instance = this;
    }
    static getInstance() {
        return Token.instance;
    }
    static hasLocalStorage() {
        return !(typeof localStorage === 'undefined' || localStorage === null);
    }
    HasToken() {
        const token = this.GetToken();
        return (typeof token === 'string' && token.length > 0);
    }
    RemoveToken() {
        if (Token.hasLocalStorage()) {
            localStorage.removeItem(`${LOCAL_STORAGE_KEY}token`);
        }
        this.token = null;
        return true;
    }
    SetToken(token) {
        this.token = token;
        if (Token.hasLocalStorage()) {
            localStorage.setItem(`${LOCAL_STORAGE_KEY}token`, this.token);
        }
        return this.token;
    }
    GetToken() {
        if (Token.hasLocalStorage()) {
            return localStorage.getItem(`${LOCAL_STORAGE_KEY}token`);
        }
        else {
            return this.token;
        }
    }
}
Token.instance = new Token();
exports.Token = Token;
