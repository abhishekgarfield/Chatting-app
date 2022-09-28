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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect } from 'react';
import { useChatContext } from '../../../context/ChatContext';
export var useChannelUpdatedListener = function (setChannels, customHandler, forceUpdate) {
    var client = useChatContext('useChannelUpdatedListener').client;
    useEffect(function () {
        var handleEvent = function (event) {
            setChannels(function (channels) {
                var _a, _b, _c, _d, _e, _f;
                var channelIndex = channels.findIndex(function (channel) { var _a; return channel.cid === ((_a = event.channel) === null || _a === void 0 ? void 0 : _a.cid); });
                if (channelIndex > -1 && event.channel) {
                    var newChannels = channels;
                    newChannels[channelIndex].data = __assign(__assign({}, event.channel), { hidden: (_b = (_a = event.channel) === null || _a === void 0 ? void 0 : _a.hidden) !== null && _b !== void 0 ? _b : (_c = newChannels[channelIndex].data) === null || _c === void 0 ? void 0 : _c.hidden, own_capabilities: (_e = (_d = event.channel) === null || _d === void 0 ? void 0 : _d.own_capabilities) !== null && _e !== void 0 ? _e : (_f = newChannels[channelIndex].data) === null || _f === void 0 ? void 0 : _f.own_capabilities });
                    return __spreadArray([], newChannels, true);
                }
                return channels;
            });
            if (forceUpdate) {
                forceUpdate();
            }
            if (customHandler && typeof customHandler === 'function') {
                customHandler(setChannels, event);
            }
        };
        client.on('channel.updated', handleEvent);
        return function () {
            client.off('channel.updated', handleEvent);
        };
    }, [customHandler]);
};
