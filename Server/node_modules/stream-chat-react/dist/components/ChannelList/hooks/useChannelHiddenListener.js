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
export var useChannelHiddenListener = function (setChannels, customHandler) {
    var client = useChatContext('useChannelHiddenListener').client;
    useEffect(function () {
        var handleEvent = function (event) {
            if (customHandler && typeof customHandler === 'function') {
                customHandler(setChannels, event);
            }
            else {
                setChannels(function (channels) {
                    var channelIndex = channels.findIndex(function (channel) { return channel.cid === event.cid; });
                    if (channelIndex < 0)
                        return __spreadArray([], channels, true);
                    // Remove the hidden channel from the list.s
                    channels.splice(channelIndex, 1);
                    return __spreadArray([], channels, true);
                });
            }
        };
        client.on('channel.hidden', handleEvent);
        return function () {
            client.off('channel.hidden', handleEvent);
        };
    }, [customHandler]);
};
