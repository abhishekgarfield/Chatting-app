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
export var useUserPresenceChangedListener = function (setChannels) {
    var client = useChatContext('useUserPresenceChangedListener').client;
    useEffect(function () {
        var handleEvent = function (event) {
            setChannels(function (channels) {
                var newChannels = channels.map(function (channel) {
                    var _a;
                    if (!((_a = event.user) === null || _a === void 0 ? void 0 : _a.id) || !channel.state.members[event.user.id]) {
                        return channel;
                    }
                    var newChannel = channel; // dumb workaround for linter
                    newChannel.state.members[event.user.id].user = event.user;
                    return newChannel;
                });
                return __spreadArray([], newChannels, true);
            });
        };
        client.on('user.presence.changed', handleEvent);
        return function () {
            client.off('user.presence.changed', handleEvent);
        };
    }, []);
};
