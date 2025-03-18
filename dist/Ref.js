var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import * as ReactIs from 'react-is';
import { handleRef } from './utils';
/**
 * Detects if a passed element is a Fiber object instead of an element. Is needed as `ReactDOM.findDOMNode()` returns
 * a Fiber in `react-test-renderer` that can cause issues with tests. Is used only in non-production env.
 *
 * @see https://github.com/facebook/react/issues/7371#issuecomment-317396864
 * @see https://github.com/Semantic-Org/Semantic-UI-React/issues/4061#issuecomment-694895617
 */
function isFiberRef(node) {
    if (node === null) {
        return false;
    }
    if (node instanceof Element || node instanceof Text) {
        return false;
    }
    return !!(node.type && node.tag);
}
export class Ref extends React.Component {
    constructor() {
        super(...arguments);
        this.nodeRef = React.createRef();
        this.state = { kind: null };
        this.handleForwardRefOverride = (node) => {
            const { children, innerRef } = this.props;
            handleRef(children.ref, node);
            handleRef(innerRef, node);
            this.currentNode = node;
        };
        this.handleSelfOverride = (node) => {
            const { children, innerRef } = this.props;
            handleRef(children.props.innerRef, node);
            handleRef(innerRef, node);
        };
    }
    static getDerivedStateFromProps(props) {
        const child = React.Children.only(props.children);
        if (child.type === Ref) {
            return { kind: 'self' };
        }
        if (ReactIs.isForwardRef(child)) {
            return { kind: 'forward' };
        }
        return { kind: 'find' };
    }
    componentDidMount() {
        if (this.state.kind === 'find') {
            let currentNode = this.nodeRef.current;
            this.prevNode = currentNode;
            handleRef(this.props.innerRef, currentNode);
        }
    }
    componentDidUpdate(prevProps) {
        if (this.state.kind === 'forward') {
            if (prevProps.innerRef !== this.props.innerRef) {
                handleRef(this.props.innerRef, this.currentNode);
            }
        }
        else if (this.state.kind === 'find') {
            let currentNode = this.nodeRef.current;
            const isNodeChanged = this.prevNode !== currentNode;
            const isRefChanged = prevProps.innerRef !== this.props.innerRef;
            if (isNodeChanged) {
                this.prevNode = currentNode;
            }
            if (isNodeChanged || isRefChanged) {
                handleRef(this.props.innerRef, currentNode);
            }
        }
    }
    componentWillUnmount() {
        if (this.state.kind === 'forward') {
            this.currentNode = null;
        }
        else if (this.state.kind === 'find') {
            handleRef(this.props.innerRef, null);
            this.prevNode = null;
        }
    }
    render() {
        const _a = this.props, { children, innerRef } = _a, rest = __rest(_a, ["children", "innerRef"]);
        const childWithProps = rest && Object.keys(rest).length > 0 ? React.cloneElement(children, rest) : children;
        if (this.state.kind === 'find') {
            return React.cloneElement(childWithProps, { ref: this.nodeRef, });
        }
        if (this.state.kind === 'forward') {
            return React.cloneElement(childWithProps, {
                ref: this.handleForwardRefOverride,
            });
        }
        if (this.state.kind === 'self') {
            return React.cloneElement(childWithProps, {
                innerRef: this.handleSelfOverride,
            });
        }
        return null;
    }
}
