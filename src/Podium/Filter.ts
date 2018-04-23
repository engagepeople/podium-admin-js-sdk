export class Filter<F> {
    private legacy: boolean = false
    private values: F

    constructor(values?: F) {
        this.values = values
    }

    public isLegacyMode(): boolean {
        return this.legacy
    }

    public setLegacyMode(mode: boolean): void {
        this.legacy = mode
    }

    public setValues(values: F): F {
        this.values = values
        return this.values
    }

    public getValues(): F {
        return this.values
    }

    public toParams(): object | F {
        if (this.legacy) {
            return {
                filter: this.values,
            }
        } else {
            return this.values
        }
    }
}
