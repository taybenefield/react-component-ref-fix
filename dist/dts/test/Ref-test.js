"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_component_ref_1 = require("@fluentui/react-component-ref");
var enzyme_1 = require("enzyme");
var React = require("react");
var fixtures_1 = require("./fixtures");
var react_test_renderer_1 = require("react-test-renderer");
var testInnerRef = function (Component) {
    var innerRef = jest.fn();
    var node = (0, enzyme_1.mount)(<react_component_ref_1.Ref innerRef={innerRef}>
      <Component />
    </react_component_ref_1.Ref>).getDOMNode();
    expect(innerRef).toHaveBeenCalledTimes(1);
    expect(innerRef).toHaveBeenCalledWith(node);
};
describe('Ref', function () {
    describe('children', function () {
        it('renders a child', function () {
            var child = <div data-child="whatever"/>;
            var innerRef = React.createRef();
            var component = (0, enzyme_1.shallow)(<react_component_ref_1.Ref innerRef={innerRef}>{child}</react_component_ref_1.Ref>);
            expect(component.contains(child)).toBeTruthy();
        });
    });
    describe('kind="find"', function () {
        it('returns node from a functional component with DOM node', function () {
            testInnerRef(fixtures_1.DOMFunction);
        });
        it('returns node from a functional component', function () {
            testInnerRef(fixtures_1.CompositeFunction);
        });
        it('returns node from a class component with DOM node', function () {
            testInnerRef(fixtures_1.DOMClass);
        });
        it('returns node from a class component', function () {
            testInnerRef(fixtures_1.CompositeClass);
        });
        it('returns "null" after unmount', function () {
            var innerRef = jest.fn();
            var wrapper = (0, enzyme_1.mount)(<react_component_ref_1.Ref innerRef={innerRef}>
          <fixtures_1.CompositeClass />
        </react_component_ref_1.Ref>);
            innerRef.mockClear();
            wrapper.unmount();
            expect(innerRef).toHaveBeenCalledTimes(1);
            expect(innerRef).toHaveBeenCalledWith(null);
        });
        it('passes an updated node', function () {
            var innerRef = jest.fn();
            var wrapper = (0, enzyme_1.mount)(<react_component_ref_1.Ref innerRef={innerRef}>
          <div />
        </react_component_ref_1.Ref>);
            expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'DIV' }));
            wrapper.setProps({ children: <button /> });
            expect(innerRef).toHaveBeenCalledTimes(2);
            expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
        });
        it('skips an update if node did not change', function () {
            var innerRef = jest.fn();
            var wrapper = (0, enzyme_1.mount)(<react_component_ref_1.Ref innerRef={innerRef}>
          <div />
        </react_component_ref_1.Ref>);
            expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'DIV' }));
            wrapper.setProps({ children: <div /> });
            expect(innerRef).toHaveBeenCalledTimes(1);
            expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'DIV' }));
        });
        it('handles updates of props', function () {
            var initialRef = jest.fn();
            var updatedRef = jest.fn();
            var wrapper = (0, enzyme_1.mount)(<react_component_ref_1.Ref innerRef={initialRef}>
          <div />
        </react_component_ref_1.Ref>);
            expect(initialRef).toHaveBeenCalled();
            expect(updatedRef).not.toHaveBeenCalled();
            jest.resetAllMocks();
            wrapper.setProps({ innerRef: updatedRef });
            expect(initialRef).not.toHaveBeenCalled();
            expect(updatedRef).toHaveBeenCalled();
        });
        it('resolves once on node/ref change', function () {
            var initialRef = jest.fn();
            var updatedRef = jest.fn();
            var wrapper = (0, enzyme_1.mount)(<react_component_ref_1.Ref innerRef={initialRef}>
          <div />
        </react_component_ref_1.Ref>);
            expect(initialRef).toHaveBeenCalledTimes(1);
            expect(updatedRef).not.toHaveBeenCalled();
            jest.resetAllMocks();
            wrapper.setProps({ children: <span />, innerRef: updatedRef });
            expect(initialRef).not.toHaveBeenCalled();
            expect(updatedRef).toHaveBeenCalledTimes(1);
        });
        it('always returns "null" for react-test-renderer', function () {
            var innerRef = jest.fn();
            var ref = jest.fn();
            (0, react_test_renderer_1.create)(<react_component_ref_1.Ref innerRef={innerRef}>
          <div ref={ref}/>
        </react_component_ref_1.Ref>);
            expect(innerRef).toHaveBeenCalledWith(null);
            expect(ref).toHaveBeenCalledWith(null);
        });
    });
    describe('kind="forward"', function () {
        it('works with "forwardRef" API', function () {
            var forwardedRef = React.createRef();
            var innerRef = React.createRef();
            (0, enzyme_1.mount)(<react_component_ref_1.Ref innerRef={innerRef}>
          <fixtures_1.ForwardedRef ref={forwardedRef}/>
        </react_component_ref_1.Ref>);
            expect(forwardedRef.current).toBeInstanceOf(Element);
            expect(innerRef.current).toBeInstanceOf(Element);
        });
        it('passes an updated node', function () {
            var innerRef = jest.fn();
            var forwardedRef = jest.fn();
            var updatedForwardedRef = jest.fn();
            var wrapper = (0, enzyme_1.mount)(<react_component_ref_1.Ref innerRef={innerRef}>
          <fixtures_1.ForwardedRef ref={forwardedRef} key="first"/>
        </react_component_ref_1.Ref>);
            expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
            expect(forwardedRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
            jest.resetAllMocks();
            wrapper.setProps({ children: <fixtures_1.ForwardedRef ref={updatedForwardedRef} key="second"/> });
            expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
            expect(updatedForwardedRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
            expect(forwardedRef).not.toHaveBeenCalled();
        });
        it('handles updates of props', function () {
            var initialRef = jest.fn();
            var updatedRef = jest.fn();
            var wrapper = (0, enzyme_1.mount)(<react_component_ref_1.Ref innerRef={initialRef}>
          <fixtures_1.ForwardedRef />
        </react_component_ref_1.Ref>);
            expect(initialRef).toHaveBeenCalled();
            expect(updatedRef).not.toHaveBeenCalled();
            jest.resetAllMocks();
            wrapper.setProps({ innerRef: updatedRef });
            expect(initialRef).not.toHaveBeenCalled();
            expect(updatedRef).toHaveBeenCalled();
        });
    });
    describe('kind="self"', function () {
        it('works with "forwardRef" API', function () {
            var _a, _b, _c;
            var forwardedRef = React.createRef();
            var innerRef = React.createRef();
            var outerRef = React.createRef();
            (0, enzyme_1.mount)(<react_component_ref_1.Ref innerRef={outerRef}>
          <react_component_ref_1.Ref innerRef={innerRef}>
            <fixtures_1.ForwardedRef ref={forwardedRef}/>
          </react_component_ref_1.Ref>
        </react_component_ref_1.Ref>);
            expect(forwardedRef.current).toBeInstanceOf(Element);
            expect(innerRef.current).toBeInstanceOf(Element);
            expect(outerRef.current).toBeInstanceOf(Element);
            expect((_a = forwardedRef.current) === null || _a === void 0 ? void 0 : _a.tagName).toBe('BUTTON');
            expect((_b = innerRef.current) === null || _b === void 0 ? void 0 : _b.tagName).toBe('BUTTON');
            expect((_c = outerRef.current) === null || _c === void 0 ? void 0 : _c.tagName).toBe('BUTTON');
        });
        it('passes an updated node', function () {
            var innerRef = jest.fn();
            var outerRef = jest.fn();
            var wrapper = (0, enzyme_1.mount)(<react_component_ref_1.Ref innerRef={outerRef}>
          <react_component_ref_1.Ref innerRef={innerRef}>
            <div />
          </react_component_ref_1.Ref>
        </react_component_ref_1.Ref>);
            expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'DIV' }));
            expect(outerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'DIV' }));
            jest.resetAllMocks();
            wrapper.setProps({
                children: (<react_component_ref_1.Ref innerRef={innerRef}>
            <button />
          </react_component_ref_1.Ref>),
            });
            expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
            expect(outerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
        });
    });
});
