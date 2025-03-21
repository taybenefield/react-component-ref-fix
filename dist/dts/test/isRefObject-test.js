"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_component_ref_1 = require("@fluentui/react-component-ref");
describe('isRefObject', function () {
    it('checks for a valid param', function () {
        expect((0, react_component_ref_1.isRefObject)(document.createElement('div'))).toBe(false);
        expect((0, react_component_ref_1.isRefObject)(null)).toBe(false);
        expect((0, react_component_ref_1.isRefObject)({ current: document.createElement('div') })).toBe(true);
        expect((0, react_component_ref_1.isRefObject)({ current: null })).toBe(true);
    });
});
