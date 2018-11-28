const LOCAL_STORAGE_KEY = '__podiumAdminSDK__'

export class Token {
    private token: string | null = null

    protected SetToken(token: string): string {
        this.token = token
        if (this.hasLocalStorage()) {
            localStorage.setItem(`${LOCAL_STORAGE_KEY}token`, this.token)
        }
        return this.token
    }

    protected GetToken(): string | null {
        if (this.hasLocalStorage()) {
            return localStorage.getItem(`${LOCAL_STORAGE_KEY}token`)
        } else {
            return this.token
        }
    }

    public HasToken(): boolean {
        let token = this.GetToken()
        return (typeof token === 'string' && token.length > 0)
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
