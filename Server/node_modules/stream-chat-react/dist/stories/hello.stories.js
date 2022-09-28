/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Channel, ChannelHeader, ChannelList, MessageInput, MessageList, Thread, VirtualizedMessageList, Window, } from '../index';
import { ConnectedUser } from './utils';
var channelId = import.meta.env.E2E_ADD_MESSAGE_CHANNEL;
var userId = import.meta.env.E2E_TEST_USER_1;
var token = import.meta.env.E2E_TEST_USER_1_TOKEN;
if (!channelId || typeof channelId !== 'string') {
    throw new Error('expected ADD_MESSAGE_CHANNEL');
}
// Sort in reverse order to avoid auto-selecting unread channel
var sort = { last_updated: 1 };
var filters = { members: { $in: [userId] }, type: 'messaging' };
var options = { limit: 10, presence: true, state: true };
export var BasicSetup = function () { return (React.createElement(ConnectedUser, { token: token, userId: userId },
    React.createElement(ChannelList, { filters: filters, options: options, showChannelSearch: true, sort: sort }),
    React.createElement(Channel, null,
        React.createElement(Window, null,
            React.createElement(ChannelHeader, null),
            React.createElement(MessageList, null),
            React.createElement(MessageInput, { focus: true })),
        React.createElement(Thread, null)))); };
// basic setup with virtualized list
export var VirtualizedSetup = function () { return (React.createElement(ConnectedUser, { token: token, userId: userId },
    React.createElement(ChannelList, { filters: filters, options: options, showChannelSearch: true, sort: sort }),
    React.createElement(Channel, null,
        React.createElement(Window, null,
            React.createElement(ChannelHeader, null),
            React.createElement(VirtualizedMessageList, { disableDateSeparator: false, messageLimit: 50 }),
            React.createElement(MessageInput, { focus: true })),
        React.createElement(Thread, null)))); };
