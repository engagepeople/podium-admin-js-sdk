"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListQuery {
    constructor() {
        this.legacy = false;
    }
    setLegacyMode(mode) {
        this.legacy = mode;
    }
    isLegacyMode() {
        return this.legacy;
    }
}
exports.ListQuery = ListQuery;
