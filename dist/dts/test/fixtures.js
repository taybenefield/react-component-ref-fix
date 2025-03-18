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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForwardedRef = exports.CompositeClass = exports.DOMClass = exports.CompositeFunction = exports.DOMFunction = void 0;
var React = require("react");
var DOMFunction = function (props) { return <div {...props} id="node"/>; };
exports.DOMFunction = DOMFunction;
var CompositeFunction = function (props) { return <exports.DOMFunction {...props}/>; };
exports.CompositeFunction = CompositeFunction;
var DOMClass = /** @class */ (function (_super) {
    __extends(DOMClass, _super);
    function DOMClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DOMClass.prototype.render = function () {
        return <div {...this.props} id="node"/>;
    };
    return DOMClass;
}(React.Component));
exports.DOMClass = DOMClass;
var CompositeClass = /** @class */ (function (_super) {
    __extends(CompositeClass, _super);
    function CompositeClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompositeClass.prototype.render = function () {
        return <DOMClass {...this.props}/>;
    };
    return CompositeClass;
}(React.Component));
exports.CompositeClass = CompositeClass;
exports.ForwardedRef = React.forwardRef(function (props, ref) { return (<div>
    <button {...props} ref={ref}/>
  </div>); });
