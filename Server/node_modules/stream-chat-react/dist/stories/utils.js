import React, { useEffect, useState } from 'react';
import { Chat } from '../';
import { StreamChat } from 'stream-chat';
var appKey = import.meta.env.E2E_APP_KEY;
if (!appKey || typeof appKey !== 'string') {
    throw new Error('expected APP_KEY');
}
export var apiKey = appKey;
export var ConnectedUser = function (_a) {
    var children = _a.children, token = _a.token, userId = _a.userId;
    var _b = useState(null), client = _b[0], setClient = _b[1];
    useEffect(function () {
        var c = new StreamChat(apiKey);
        var handleConnectionChange = function (_a) {
            var _b = _a.online, online = _b === void 0 ? false : _b;
            if (!online)
                console.log('connection lost');
            setClient(c);
        };
        c.on('connection.changed', handleConnectionChange);
        c.connectUser({ id: userId }, token);
        return function () {
            c.off('connection.changed', handleConnectionChange);
            c.disconnectUser().then(function () { return console.log('connection closed'); });
        };
    }, [userId, token]);
    if (!client) {
        return React.createElement("p", null,
            "Waiting for connection to be established with user: ",
            userId,
            "...");
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("h3", null,
            "User: ",
            userId),
        React.createElement("div", { className: 'chat-wrapper' },
            React.createElement(Chat, { client: client }, children))));
};
