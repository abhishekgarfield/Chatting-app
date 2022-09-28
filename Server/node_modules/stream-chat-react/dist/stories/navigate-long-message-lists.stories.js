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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Channel, ChannelHeader, ChannelList, MessageList, Thread, useChannelActionContext, useChannelStateContext, useChatContext, Window, } from '../index';
import { ConnectedUser } from './utils';
var user1Id = import.meta.env.E2E_TEST_USER_1;
var user1Token = import.meta.env.E2E_TEST_USER_1_TOKEN;
var user2Id = import.meta.env.E2E_TEST_USER_2;
var user2Token = import.meta.env.E2E_TEST_USER_2_TOKEN;
var channelId = import.meta.env.E2E_LONG_MESSAGE_LISTS_CHANNEL;
if (!channelId || typeof channelId !== 'string') {
    throw new Error('expected ADD_MESSAGE_CHANNEL');
}
var OtherUserControlButtons = function () {
    var client = useChatContext().client;
    var _a = useChannelStateContext(), channel = _a.channel, messages = _a.messages, threadMessages = _a.threadMessages;
    var lastMessage = channel.state.messages.slice(-1)[0];
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { "data-testid": 'receive-reply', onClick: function () {
                return channel.sendMessage({
                    parent_id: lastMessage.id,
                    text: 'Reply back',
                });
            } }, "Receive reply"),
        React.createElement("button", { "data-testid": 'delete-other-last-reply', onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                var lastReply;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            lastReply = threadMessages === null || threadMessages === void 0 ? void 0 : threadMessages.slice(-1)[0];
                            if (!lastReply) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.deleteMessage(lastReply.id, true)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); } }, "Delete other user's last reply"),
        React.createElement("button", { "data-testid": 'add-other-user-message', onClick: function () {
                return channel.sendMessage({
                    text: "Other user's message",
                });
            } }, "Receive a message"),
        React.createElement("button", { "data-testid": 'delete-other-last-message', onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                var lastMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            lastMessage = messages === null || messages === void 0 ? void 0 : messages.slice(-1)[0];
                            if (!lastMessage) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.deleteMessage(lastMessage.id, true)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); } }, "Delete other user's last message")));
};
// Sort in reverse order to avoid auto-selecting unread channel
var sort = { last_updated: 1 };
var Controls = function () {
    var client = useChatContext().client;
    var threadMessages = useChannelStateContext().threadMessages;
    return (React.createElement("div", null,
        React.createElement("button", { "data-testid": 'delete-last-reply', onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                var lastReply;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            lastReply = threadMessages === null || threadMessages === void 0 ? void 0 : threadMessages.slice(-1)[0];
                            if (!lastReply) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.deleteMessage(lastReply.id, true)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); } }, "Delete last reply")));
};
var SetThreadOpen = function () {
    var openThread = useChannelActionContext().openThread;
    var messages = useChannelStateContext().messages;
    useEffect(function () {
        if (!messages)
            return;
        var lastMsg = messages.slice(-1)[0];
        if (lastMsg)
            openThread(lastMsg, { preventDefault: function () { return null; } });
    }, [messages]);
    return null;
};
var OtherUserControls = function () {
    var theOtherUserCredentials = document.location.search.match('user1')
        ? { token: user2Token, userId: user2Id }
        : { token: user1Token, userId: user1Id };
    return (React.createElement("div", { className: theOtherUserCredentials.userId },
        React.createElement("style", null, "\n      .".concat(theOtherUserCredentials.userId, " .str-chat-channel {\n        max-height: 30px;\n        display: inline-block;\n      }\n      .").concat(theOtherUserCredentials.userId, " .str-chat__container {\n        height: 30px;\n      }\n\n      .").concat(theOtherUserCredentials.userId, " .messaging.str-chat .str-chat__thread {\n        display: none;\n      }\n      ")),
        React.createElement(ConnectedUser, __assign({}, theOtherUserCredentials),
            React.createElement("div", { style: { display: 'none' } },
                React.createElement(ChannelList, { customActiveChannel: channelId, filters: { id: { $eq: channelId }, members: { $in: [theOtherUserCredentials.userId] } }, setActiveChannelOnMount: true, sort: sort })),
            React.createElement("div", { style: { height: '30px' } },
                React.createElement(Channel, null,
                    React.createElement(SetThreadOpen, null),
                    React.createElement(OtherUserControlButtons, null),
                    React.createElement(Thread, null))))));
};
var WrappedConnectedUser = function (_a) {
    var token = _a.token, userId = _a.userId;
    return (React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
        React.createElement("style", null, "\n\t \t.str-chat__thread .str-chat__message-data.str-chat__message-simple-data {\n\t\t\t visibility: hidden;\n\t\t}\n\t "),
        React.createElement("div", { className: userId },
            React.createElement(ConnectedUser, { token: token, userId: userId },
                React.createElement(ChannelList, { filters: { id: { $eq: channelId }, members: { $in: [userId] } }, setActiveChannelOnMount: false, sort: sort }),
                React.createElement(Channel, null,
                    React.createElement(Window, null,
                        React.createElement(ChannelHeader, null),
                        React.createElement(MessageList, null),
                        React.createElement(Controls, null)),
                    React.createElement(Thread, null)))),
        React.createElement(OtherUserControls, null)));
};
export var User1 = function () {
    if (!user1Id || typeof user1Id !== 'string') {
        throw new Error('expected TEST_USER_1');
    }
    if (!user1Token || typeof user1Token !== 'string') {
        throw new Error('expected TEST_USER_1_TOKEN');
    }
    return React.createElement(WrappedConnectedUser, { token: user1Token, userId: user1Id });
};
