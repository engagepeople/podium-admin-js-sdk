export class ListQuery {
    protected legacy: boolean = false

    public setLegacyMode(mode: boolean): void {
        this.legacy = mode
    }

    public isLegacyMode(): boolean {
        return this.legacy
    }
}
