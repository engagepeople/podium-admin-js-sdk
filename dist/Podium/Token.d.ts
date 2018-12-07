export declare class Token {
    static getInstance(): Token;
    private static instance;
    private static hasLocalStorage;
    private token;
    constructor();
    HasToken(): boolean;
    RemoveToken(): boolean;
    protected SetToken(token: string): string;
    protected GetToken(): string | null;
}
