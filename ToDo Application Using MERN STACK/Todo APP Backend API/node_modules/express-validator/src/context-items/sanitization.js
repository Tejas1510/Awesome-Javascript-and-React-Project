"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Sanitization {
    constructor(sanitizer, custom, options = []) {
        this.sanitizer = sanitizer;
        this.custom = custom;
        this.options = options;
    }
    async run(context, value, meta) {
        const { path, location } = meta;
        const newValue = this.custom
            ? this.sanitizer(value, meta)
            : this.sanitizer(utils_1.toString(value), ...this.options);
        context.setData(path, newValue, location);
    }
}
exports.Sanitization = Sanitization;
