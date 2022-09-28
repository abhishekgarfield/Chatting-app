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
                    attachments: [
                        {
                            fallback: 'A.png',
                            image_url: 'https://getstream.imgix.net/images/random_svg/A.png',
                            type: 'image',
                        },
                        {
                            fallback: 'B.png',
                            image_url: 'https://getstream.imgix.net/images/random_svg/B.png',
                            type: 'image',
                        },
                    ],
                    text: 'chat: https://getstream.io/chat/\nactivity-feeds: https://getstream.io/activity-feeds/',
                });
            } }, "Add message")));
};
// Sort in reverse order to avoid auto-selecting unread channel
var sort = { last_updated: 1 };
var WrappedConnectedUser = function (_a) {
    var token = _a.token, userId = _a.userId;
    return (React.createElement(ConnectedUser, { token: token, userId: userId },
        React.createElement(ChannelList, { filters: { id: { $eq: 'edit-message-channel' }, members: { $in: [userId] } }, sort: sort }),
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
