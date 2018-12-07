"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListQuery_1 = require("./ListQuery");
class Paginator extends ListQuery_1.ListQuery {
    constructor() {
        super(...arguments);
        this.page = 1;
        this.perPage = 50;
        this.sortField = "created_at" /* CREATED_AT */;
        this.sortDirection = "desc" /* DESC */;
    }
    setPage(page) {
        this.page = page;
        return this;
    }
    setPerPage(perPage) {
        this.perPage = perPage;
        return this;
    }
    setSort(field, direction) {
        this.sortField = field;
        this.sortDirection = direction;
        return this;
    }
    setSortField(field) {
        this.sortField = field;
        return this;
    }
    setSortDirection(direction) {
        this.sortDirection = direction;
        return this;
    }
    setSortDesc(direction) {
        if (direction) {
            this.sortDirection = "desc" /* DESC */;
        }
        else {
            this.sortDirection = "asc" /* ASC */;
        }
        return this;
    }
    toParams() {
        const payload = {
            count: this.perPage,
            page: this.page,
        };
        if (this.isLegacyMode()) {
            return Object.assign(payload, {
                sorting: { [this.sortField]: this.sortDirection },
            });
        }
        else {
            return Object.assign(payload, {
                sort_direction: this.sortDirection,
                sort_field: this.sortField,
            });
        }
    }
}
exports.Paginator = Paginator;
