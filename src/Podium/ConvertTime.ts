export class ConvertTime {

    public APIToUTC(data: object): object {
        if (typeof data !== 'object') {
            return data
        }
        return this.loopNestedObj(data, 'toUTC')
    }

    public UTCtoAPI(data: object): object {
        if (typeof data !== 'object') {
            return data
        }
        return this.loopNestedObj(data, 'toAPI')
    }

    // tslint:disable-next-line:no-any
    private loopNestedObj = (obj: any, method: string) => {
        Object.keys(obj).forEach((key) => {
            if (obj[key] && typeof obj[key] === 'object' && !(obj[key] instanceof Date)) {
                this.loopNestedObj(obj[key], method)
            } else {
                if ((method === 'toUTC') && (typeof obj[key] === 'string')) {
                    if (this.isAPIDate(obj[key])) {
                        obj[key] = this.toUTC(obj[key])
                    }
                }
                if ((method === 'toAPI') && (obj[key] instanceof Date)) {
                    obj[key] = this.toAPI(obj[key])
                }
            }
        })
        return obj
    }

    private isAPIDate = (key: string): boolean => {
        // tslint:disable-next-line:max-line-length
        const n = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/g
        return n.test(key)
    }

    private toUTC = (key: string): Date => {
        return new Date(key.replace(' ', 'T') + 'Z')
    }

    private toAPI = (key: Date) => {
        return `${key.getUTCFullYear()}-
        ${this.strPad(key.getUTCMonth() + 1)}-
        ${this.strPad(key.getUTCDate())}
        ${this.strPad(key.getUTCHours())}:
        ${this.strPad(key.getUTCMinutes())}:
        ${this.strPad(key.getUTCSeconds())}`
    }

    private strPad = (n: number): string => {
        return String('00' + n).slice(-2)
    }
}
