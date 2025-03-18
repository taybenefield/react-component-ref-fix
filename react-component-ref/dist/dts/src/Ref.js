"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ref = void 0;
var React = require("react");
var ReactIs = require("react-is");
var utils_1 = require("./utils");
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
var Ref = /** @class */ (function (_super) {
    __extends(Ref, _super);
    function Ref() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeRef = React.createRef();
        _this.state = { kind: null };
        _this.handleForwardRefOverride = function (node) {
            var _a = _this.props, children = _a.children, innerRef = _a.innerRef;
            (0, utils_1.handleRef)(children.ref, node);
            (0, utils_1.handleRef)(innerRef, node);
            _this.currentNode = node;
        };
        _this.handleSelfOverride = function (node) {
            var _a = _this.props, children = _a.children, innerRef = _a.innerRef;
            (0, utils_1.handleRef)(children.props.innerRef, node);
            (0, utils_1.handleRef)(innerRef, node);
        };
        return _this;
    }
    Ref.getDerivedStateFromProps = function (props) {
        var child = React.Children.only(props.children);
        if (child.type === Ref) {
            return { kind: 'self' };
        }
        if (ReactIs.isForwardRef(child)) {
            return { kind: 'forward' };
        }
        return { kind: 'find' };
    };
    Ref.prototype.componentDidMount = function () {
        if (this.state.kind === 'find') {
            var currentNode = this.nodeRef.current;
            this.prevNode = currentNode;
            (0, utils_1.handleRef)(this.props.innerRef, currentNode);
        }
    };
    Ref.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.kind === 'forward') {
            if (prevProps.innerRef !== this.props.innerRef) {
                (0, utils_1.handleRef)(this.props.innerRef, this.currentNode);
            }
        }
        else if (this.state.kind === 'find') {
            var currentNode = this.nodeRef.current;
            var isNodeChanged = this.prevNode !== currentNode;
            var isRefChanged = prevProps.innerRef !== this.props.innerRef;
            if (isNodeChanged) {
                this.prevNode = currentNode;
            }
            if (isNodeChanged || isRefChanged) {
                (0, utils_1.handleRef)(this.props.innerRef, currentNode);
            }
        }
    };
    Ref.prototype.componentWillUnmount = function () {
        if (this.state.kind === 'forward') {
            this.currentNode = null;
        }
        else if (this.state.kind === 'find') {
            (0, utils_1.handleRef)(this.props.innerRef, null);
            this.prevNode = null;
        }
    };
    Ref.prototype.render = function () {
        var _a = this.props, children = _a.children, innerRef = _a.innerRef, rest = __rest(_a, ["children", "innerRef"]);
        var childWithProps = rest && Object.keys(rest).length > 0 ? React.cloneElement(children, rest) : children;
        if (this.state.kind === 'find') {
            return React.cloneElement(childWithProps, { ref: this.nodeRef });
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
    };
    return Ref;
}(React.Component));
exports.Ref = Ref;
