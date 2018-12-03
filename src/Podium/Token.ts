const LOCAL_STORAGE_KEY = '__podiumAdminSDK__'

export class Token {
    public static getInstance(): Token {
        return Token.instance
    }

    private static instance: Token = new Token()
    private static hasLocalStorage(): boolean {
        return !(typeof localStorage === 'undefined' || localStorage === null)
    }

    private token: string | null = null

    constructor() {
        // if (Token.instance) {
        //     throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.')
        // }
        Token.instance = this
    }

    public HasToken(): boolean {
        const token = this.GetToken()
        return (typeof token === 'string' && token.length > 0)
    }

    public RemoveToken(): boolean {
        if (Token.hasLocalStorage()) {
            localStorage.removeItem(`${LOCAL_STORAGE_KEY}token`)
        }
        this.token = null
        return true
    }

    protected SetToken(token: string): string {
        this.token = token
        if (Token.hasLocalStorage()) {
            localStorage.setItem(`${LOCAL_STORAGE_KEY}token`, this.token)
        }
        return this.token
    }

    protected GetToken(): string | null {
        if (Token.hasLocalStorage()) {
            return localStorage.getItem(`${LOCAL_STORAGE_KEY}token`)
        } else {
            return this.token
        }
    }

}
