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
export var useChannelTruncatedListener = function (setChannels, customHandler, forceUpdate) {
    var client = useChatContext('useChannelTruncatedListener').client;
    useEffect(function () {
        var handleEvent = function (event) {
            setChannels(function (channels) { return __spreadArray([], channels, true); });
            if (customHandler && typeof customHandler === 'function') {
                customHandler(setChannels, event);
            }
            if (forceUpdate) {
                forceUpdate();
            }
        };
        client.on('channel.truncated', handleEvent);
        return function () {
            client.off('channel.truncated', handleEvent);
        };
    }, [customHandler]);
};
