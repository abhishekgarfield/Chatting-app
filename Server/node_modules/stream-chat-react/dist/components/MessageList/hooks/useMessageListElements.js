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
/* eslint-disable no-continue */
import React, { useMemo } from 'react';
import { useLastReadData } from './useLastReadData';
import { getLastReceived } from '../utils';
import { CUSTOM_MESSAGE_TYPE } from '../../../constants/messageTypes';
import { DateSeparator as DefaultDateSeparator } from '../../DateSeparator/DateSeparator';
import { EventComponent } from '../../EventComponent/EventComponent';
import { Message } from '../../Message';
import { useChatContext } from '../../../context/ChatContext';
import { useComponentContext } from '../../../context/ComponentContext';
import { isDate } from '../../../context/TranslationContext';
export var useMessageListElements = function (props) {
    var enrichedMessages = props.enrichedMessages, internalMessageProps = props.internalMessageProps, messageGroupStyles = props.messageGroupStyles, onMessageLoadCaptured = props.onMessageLoadCaptured, read = props.read, returnAllReadData = props.returnAllReadData, threadList = props.threadList;
    var _a = useChatContext('useMessageListElements'), client = _a.client, customClasses = _a.customClasses;
    var _b = useComponentContext('useMessageListElements'), _c = _b.DateSeparator, DateSeparator = _c === void 0 ? DefaultDateSeparator : _c, HeaderComponent = _b.HeaderComponent, _d = _b.MessageSystem, MessageSystem = _d === void 0 ? EventComponent : _d;
    // get the readData, but only for messages submitted by the user themselves
    var readData = useLastReadData({
        messages: enrichedMessages,
        read: read,
        returnAllReadData: returnAllReadData,
        userID: client.userID,
    });
    var lastReceivedId = useMemo(function () { return getLastReceived(enrichedMessages); }, [enrichedMessages]);
    var elements = useMemo(function () {
        return enrichedMessages.map(function (message) {
            var _a;
            if (message.customType === CUSTOM_MESSAGE_TYPE.date &&
                message.date &&
                isDate(message.date)) {
                return (React.createElement("li", { key: "".concat(message.date.toISOString(), "-i") },
                    React.createElement(DateSeparator, { date: message.date, formatDate: internalMessageProps.formatDate, unread: message.unread })));
            }
            if (message.customType === CUSTOM_MESSAGE_TYPE.intro && HeaderComponent) {
                return (React.createElement("li", { key: 'intro' },
                    React.createElement(HeaderComponent, null)));
            }
            if (message.type === 'system') {
                return (React.createElement("li", { key: ((_a = message.event) === null || _a === void 0 ? void 0 : _a.created_at) ||
                        message.created_at ||
                        '' },
                    React.createElement(MessageSystem, { message: message })));
            }
            var groupStyles = messageGroupStyles[message.id] || '';
            var messageClass = (customClasses === null || customClasses === void 0 ? void 0 : customClasses.message) || "str-chat__li str-chat__li--".concat(groupStyles);
            return (React.createElement("li", { className: messageClass, "data-message-id": message.id, "data-testid": messageClass, key: message.id || message.created_at, onLoadCapture: onMessageLoadCaptured },
                React.createElement(Message, __assign({ groupStyles: [groupStyles], lastReceivedId: lastReceivedId, message: message, readBy: readData[message.id] || [], threadList: threadList }, internalMessageProps))));
        });
    }, [
        enrichedMessages,
        internalMessageProps,
        lastReceivedId,
        messageGroupStyles,
        onMessageLoadCaptured,
        readData,
        threadList,
    ]);
    return elements;
};
