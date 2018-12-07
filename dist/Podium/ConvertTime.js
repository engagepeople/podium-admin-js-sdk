"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["TO_UTC"] = 0] = "TO_UTC";
    DIRECTION[DIRECTION["TO_API"] = 1] = "TO_API";
})(DIRECTION || (DIRECTION = {}));
class ConvertTime {
    constructor(data) {
        // tslint:disable-next-line:max-line-length
        this.APIDateRegEx = new RegExp('^\\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\\d|3[0-1]) ([0-1]?\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$');
        // tslint:disable-next-line:no-any
        this.loopNestedObj = (obj, method) => {
            Object.keys(obj).forEach((key) => {
                if (obj[key] && typeof obj[key] === 'object' && !(obj[key] instanceof Date)) {
                    this.loopNestedObj(obj[key], method);
                }
                else {
                    if ((method === DIRECTION.TO_UTC) && (typeof obj[key] === 'string')) {
                        if (this.isAPIDate(obj[key])) {
                            obj[key] = this.StringToUTC(obj[key]);
                        }
                    }
                    if ((method === DIRECTION.TO_API) && (obj[key] instanceof Date)) {
                        obj[key] = this.DateToAPI(obj[key]);
                    }
                }
            });
            return obj;
        };
        this.isAPIDate = (key) => {
            return this.APIDateRegEx.test(key);
        };
        this.StringToUTC = (key) => {
            return new Date(key.replace(' ', 'T') + 'Z');
        };
        this.DateToAPI = (key) => {
            // tslint:disable-next-line:max-line-length
            return `${key.getUTCFullYear()}-${this.strPad(key.getUTCMonth() + 1)}-${this.strPad(key.getUTCDate())} ${this.strPad(key.getUTCHours())}:${this.strPad(key.getUTCMinutes())}:${this.strPad(key.getUTCSeconds())}`;
        };
        this.strPad = (n) => {
            return String('00' + n).slice(-2);
        };
        if (typeof data !== 'object') {
            throw new Error('Convert Time must accept an object');
        }
        this.data = data;
    }
    ToUTC() {
        return this.loopNestedObj(this.data, DIRECTION.TO_UTC);
    }
    ToAPI() {
        return this.loopNestedObj(this.data, DIRECTION.TO_API);
    }
}
exports.ConvertTime = ConvertTime;
