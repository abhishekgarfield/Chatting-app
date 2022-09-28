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
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import { Channel, ChannelHeader, ChannelList, MessageList, MessageStatus, Thread, Window, } from '../index';
import { ConnectedUser } from './utils';
var channelId = import.meta.env.E2E_ADD_MESSAGE_CHANNEL;
if (!channelId || typeof channelId !== 'string') {
    throw new Error('expected ADD_MESSAGE_CHANNEL');
}
var CustomMessageStatus = function (props) {
    var allCapsUserName = useCallback(function (user) { return (user.name || user.id).toUpperCase(); }, []);
    return React.createElement(MessageStatus, __assign({}, props, { tooltipUserNameMapper: allCapsUserName }));
};
// Sort in reverse order to avoid auto-selecting unread channel
var sort = { last_updated: 1 };
var WrappedConnectedUser = function (_a) {
    var token = _a.token, userId = _a.userId;
    return (React.createElement(ConnectedUser, { token: token, userId: userId },
        React.createElement(ChannelList, { filters: { id: { $eq: 'add-message' }, members: { $in: [userId] } }, sort: sort }),
        React.createElement(Channel, { MessageStatus: CustomMessageStatus },
            React.createElement(Window, null,
                React.createElement(ChannelHeader, null),
                React.createElement(MessageList, null)),
            React.createElement(Thread, null))));
};
export var User1 = function () {
    var userId = import.meta.env.E2E_TEST_USER_1;
    var token = import.meta.env.E2E_TEST_USER_1_TOKEN;
    if (!userId || typeof userId !== 'string') {
        throw new Error('expected TEST_USER_1');
    }
    if (!token || typeof token !== 'string') {
        throw new Error('expected TEST_USER_1_TOKEN');
    }
    return React.createElement(WrappedConnectedUser, { token: token, userId: userId });
};
export var User2 = function () {
    var userId = import.meta.env.E2E_TEST_USER_2;
    var token = import.meta.env.E2E_TEST_USER_2_TOKEN;
    if (!userId || typeof userId !== 'string') {
        throw new Error('expected TEST_USER_2');
    }
    if (!token || typeof token !== 'string') {
        throw new Error('expected TEST_USER_2_TOKEN');
    }
    return React.createElement(WrappedConnectedUser, { token: token, userId: userId });
};
