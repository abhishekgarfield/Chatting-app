var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
export var Tooltip = function (_a) {
    var children = _a.children, rest = __rest(_a, ["children"]);
    return (React.createElement("div", __assign({ className: 'str-chat__tooltip' }, rest), children));
};
export var PopperTooltip = function (_a) {
    var children = _a.children, _b = _a.offset, offset = _b === void 0 ? [0, 10] : _b, referenceElement = _a.referenceElement, _c = _a.placement, placement = _c === void 0 ? 'top' : _c, _d = _a.visible, visible = _d === void 0 ? false : _d;
    var _e = useState(null), popperElement = _e[0], setPopperElement = _e[1];
    var _f = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: offset,
                },
            },
        ],
        placement: placement,
    }), attributes = _f.attributes, styles = _f.styles;
    if (!visible)
        return null;
    return (React.createElement("div", __assign({ className: 'str-chat__tooltip', ref: setPopperElement, style: styles.popper }, attributes.popper), children));
};
