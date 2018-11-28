import {ListQuery} from './ListQuery'

export class Filter<F> extends ListQuery {

    private values: F | undefined

    constructor(values?: F) {
        super()
        this.values = values
    }

    public setValues(values: F): Filter<F> {
        this.values = values
        return this
    }

    public getValues(): F | undefined {
        return this.values
    }

    public toParams(): object | F | undefined {
        if (this.isLegacyMode()) {
            return {
                filter: this.values,
            }
        } else {
            return this.values
        }
    }
}
