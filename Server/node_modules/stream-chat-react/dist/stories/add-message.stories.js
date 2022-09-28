/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Channel, ChannelHeader, ChannelList, MessageList, Thread, useChannelStateContext, Window, } from '../index';
import { ConnectedUser } from './utils';
var channelId = import.meta.env.E2E_ADD_MESSAGE_CHANNEL;
if (!channelId || typeof channelId !== 'string') {
    throw new Error('expected ADD_MESSAGE_CHANNEL');
}
var Controls = function () {
    var channel = useChannelStateContext().channel;
    return (React.createElement("div", null,
        React.createElement("button", { "data-testid": 'truncate', onClick: function () { return channel.truncate(); } }, "Truncate"),
        React.createElement("button", { "data-testid": 'add-message', onClick: function () {
                return channel.sendMessage({
                    text: 'Hello world!',
                });
            } }, "Add message")));
};
// Sort in reverse order to avoid auto-selecting unread channel
var sort = { last_updated: 1 };
var WrappedConnectedUser = function (_a) {
    var token = _a.token, userId = _a.userId;
    return (React.createElement(ConnectedUser, { token: token, userId: userId },
        React.createElement(ChannelList, { filters: { id: { $eq: 'add-message' }, members: { $in: [userId] } }, setActiveChannelOnMount: false, sort: sort }),
        React.createElement(Channel, null,
            React.createElement(Window, null,
                React.createElement(ChannelHeader, null),
                React.createElement(MessageList, null),
                React.createElement(Controls, null)),
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
