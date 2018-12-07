"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListQuery_1 = require("./ListQuery");
class Filter extends ListQuery_1.ListQuery {
    constructor(values) {
        super();
        this.values = values;
    }
    setValues(values) {
        this.values = values;
        return this;
    }
    getValues() {
        return this.values;
    }
    toParams() {
        if (this.isLegacyMode()) {
            return {
                filter: this.values,
            };
        }
        else {
            return this.values;
        }
    }
}
exports.Filter = Filter;
