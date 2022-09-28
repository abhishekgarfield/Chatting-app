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
import uniqBy from 'lodash.uniqby';
import { moveChannelUp } from '../utils';
import { useChatContext } from '../../../context/ChatContext';
export var useMessageNewListener = function (setChannels, lockChannelOrder, allowNewMessagesFromUnfilteredChannels) {
    if (lockChannelOrder === void 0) { lockChannelOrder = false; }
    if (allowNewMessagesFromUnfilteredChannels === void 0) { allowNewMessagesFromUnfilteredChannels = true; }
    var client = useChatContext('useMessageNewListener').client;
    useEffect(function () {
        var handleEvent = function (event) {
            setChannels(function (channels) {
                var channelInList = channels.filter(function (channel) { return channel.cid === event.cid; }).length > 0;
                if (!channelInList && allowNewMessagesFromUnfilteredChannels && event.channel_type) {
                    var channel = client.channel(event.channel_type, event.channel_id);
                    return uniqBy(__spreadArray([channel], channels, true), 'cid');
                }
                if (!lockChannelOrder)
                    return moveChannelUp({ channels: channels, cid: event.cid || '' });
                return channels;
            });
        };
        client.on('message.new', handleEvent);
        return function () {
            client.off('message.new', handleEvent);
        };
    }, [lockChannelOrder]);
};
