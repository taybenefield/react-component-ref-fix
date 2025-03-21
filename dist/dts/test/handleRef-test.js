"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_component_ref_1 = require("@fluentui/react-component-ref");
var React = require("react");
describe('handleRef', function () {
    it('throws an error when "ref" is string', function () {
        var node = document.createElement('div');
        expect(function () {
            // handleRef() does not accept string, but in this test we want ensure that this case will be handled
            (0, react_component_ref_1.handleRef)('ref', node);
        }).toThrow();
    });
    it('calls with node when "ref" is function', function () {
        var ref = jest.fn();
        var node = document.createElement('div');
        (0, react_component_ref_1.handleRef)(ref, node);
        expect(ref).toHaveBeenCalledWith(node);
    });
    it('does not do anything when "ref" is null', function () {
        var node = document.createElement('div');
        expect(function () {
            (0, react_component_ref_1.handleRef)(null, node);
        }).not.toThrow();
    });
    it('assigns to "current" when "ref" is object', function () {
        var ref = React.createRef();
        var node = document.createElement('div');
        (0, react_component_ref_1.handleRef)(ref, node);
        expect(ref.current).toBe(node);
    });
});
