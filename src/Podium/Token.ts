const LOCAL_STORAGE_KEY = '__podiumAdminSDK__'

export class Token {
    private token: string = null

    protected SetToken(token: string): string {
        this.token = token
        if (this.hasLocalStorage()) {
            localStorage.setItem(`${LOCAL_STORAGE_KEY}token`, this.token)
            return this.token
        }
        return this.token
    }

    protected GetToken(): string {
        if (this.hasLocalStorage()) {
            return localStorage.getItem(`${LOCAL_STORAGE_KEY}token`)
        } else {
            return this.token
        }
    }

    protected HasToken(): boolean {
        return (typeof this.GetToken() === 'string')
    }

    protected RemoveToken(): boolean {
        if (this.hasLocalStorage()) {
            localStorage.removeItem(`${LOCAL_STORAGE_KEY}token`)
        }
        this.token = null
        return true
    }

    private hasLocalStorage(): boolean {
        return !(typeof localStorage === 'undefined' || localStorage === null)
    }

}
