"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Settings {
    constructor() {
        this.APIVersions = [1];
        this.settings = {
            endpoint: 'https://api.podiumrewards.com/',
            locale: "en-CA" /* EN_CA */,
            onRequestError: (error) => {
                console.warn(error);
            },
            version: this.APIVersions[this.APIVersions.length - 1],
        };
    }
    setVersion(version) {
        if (this.APIVersions.includes(version)) {
            this.settings.version = version;
        }
        else {
            throw new Error(`Version ${version} does not exist in the API`);
        }
        return this;
    }
    getVersion() {
        return this.settings.version;
    }
    setLocale(locale) {
        this.settings.locale = locale;
        return this;
    }
    getLocale() {
        return this.settings.locale;
    }
    setEndpoint(endpoint) {
        this.settings.endpoint = endpoint;
        return this;
    }
    getEndpoint() {
        return this.settings.endpoint;
    }
    setOnRequestError(callback) {
        this.settings.onRequestError = callback;
        return this;
    }
    getOnRequestError() {
        return this.settings.onRequestError;
    }
}
exports.Settings = Settings;
