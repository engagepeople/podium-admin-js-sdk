import { ListQuery } from './ListQuery';
export declare class Filter<F> extends ListQuery {
    private values;
    constructor(values?: F);
    setValues(values: F): Filter<F>;
    getValues(): F | undefined;
    toParams(): object | F | undefined;
}
