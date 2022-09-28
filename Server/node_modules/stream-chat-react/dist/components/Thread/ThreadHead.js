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
import React from 'react';
import { Message } from '../Message';
import { ThreadStart as DefaultThreadStart } from './ThreadStart';
import { useComponentContext } from '../../context';
export var ThreadHead = function (props) {
    var _a = useComponentContext('ThreadHead').ThreadStart, ThreadStart = _a === void 0 ? DefaultThreadStart : _a;
    return (React.createElement("div", { className: 'str-chat__parent-message-li' },
        React.createElement(Message, __assign({ initialMessage: true, threadList: true }, props)),
        React.createElement(ThreadStart, null)));
};
