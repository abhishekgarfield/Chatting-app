import React, { useState } from 'react';
import { ConnectedUser } from './utils';
import { Channel, ChannelHeader, ChannelList, MESSAGE_ACTIONS, MessageList, Thread, Window, } from '../components';
var allActions = Object.keys(MESSAGE_ACTIONS);
var WrappedConnectedUser = function (_a) {
    var token = _a.token, userId = _a.userId;
    var _b = useState(allActions), messageActions = _b[0], setMessageActions = _b[1];
    return (React.createElement(ConnectedUser, { token: token, userId: userId },
        React.createElement(ChannelList, { filters: { id: { $eq: 'jump-to-message' } } }),
        React.createElement(Channel, null,
            React.createElement(Window, null,
                React.createElement(ChannelHeader, null),
                React.createElement(MessageList, { messageActions: messageActions }),
                React.createElement("div", null,
                    "Current messageActions: ",
                    React.createElement("i", null, messageActions.join(', ') || 'None')),
                React.createElement("div", null,
                    React.createElement("span", null, "Switch to: "),
                    React.createElement("button", { onClick: function () { return setMessageActions(allActions); }, type: 'button' }, "All"),
                    React.createElement("button", { onClick: function () { return setMessageActions(['edit', 'react']); }, type: 'button' }, "edit, react"),
                    React.createElement("button", { onClick: function () { return setMessageActions(['edit', 'react', 'reply']); }, type: 'button' }, "edit, react, reply"),
                    React.createElement("button", { onClick: function () { return setMessageActions([]); }, type: 'button' }, "None"))),
            React.createElement(Thread, { messageActions: messageActions }))));
};
export var ToggleActions = function () {
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
