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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { useEnrichedMessages } from './hooks/useEnrichedMessages';
import { useMessageListElements } from './hooks/useMessageListElements';
import { useScrollLocationLogic } from './hooks/useScrollLocationLogic';
import { MessageNotification as DefaultMessageNotification } from './MessageNotification';
import { MessageListNotifications as DefaultMessageListNotifications } from './MessageListNotifications';
import { useChannelActionContext, } from '../../context/ChannelActionContext';
import { useChannelStateContext, } from '../../context/ChannelStateContext';
import { useChatContext } from '../../context/ChatContext';
import { useComponentContext } from '../../context/ComponentContext';
import { EmptyStateIndicator as DefaultEmptyStateIndicator } from '../EmptyStateIndicator';
import { InfiniteScroll } from '../InfiniteScrollPaginator/InfiniteScroll';
import { LoadingIndicator as DefaultLoadingIndicator } from '../Loading';
import { defaultPinPermissions, MESSAGE_ACTIONS } from '../Message/utils';
import { TypingIndicator as DefaultTypingIndicator } from '../TypingIndicator';
import { MessageListMainPanel } from './MessageListMainPanel';
var MessageListWithContext = function (props) {
    var channel = props.channel, _a = props.disableDateSeparator, disableDateSeparator = _a === void 0 ? false : _a, groupStyles = props.groupStyles, _b = props.hideDeletedMessages, hideDeletedMessages = _b === void 0 ? false : _b, _c = props.hideNewMessageSeparator, hideNewMessageSeparator = _c === void 0 ? false : _c, _d = props.messageActions, messageActions = _d === void 0 ? Object.keys(MESSAGE_ACTIONS) : _d, _e = props.messages, messages = _e === void 0 ? [] : _e, notifications = props.notifications, _f = props.noGroupByUser, noGroupByUser = _f === void 0 ? false : _f, _g = props.pinPermissions, pinPermissions = _g === void 0 ? defaultPinPermissions : _g, // @deprecated in favor of `channelCapabilities` - TODO: remove in next major release
    _h = props.returnAllReadData, // @deprecated in favor of `channelCapabilities` - TODO: remove in next major release
    returnAllReadData = _h === void 0 ? false : _h, _j = props.threadList, threadList = _j === void 0 ? false : _j, _k = props.unsafeHTML, unsafeHTML = _k === void 0 ? false : _k, headerPosition = props.headerPosition, read = props.read, _l = props.messageLimit, messageLimit = _l === void 0 ? 100 : _l, loadMoreCallback = props.loadMore, loadMoreNewerCallback = props.loadMoreNewer, _m = props.hasMoreNewer, hasMoreNewer = _m === void 0 ? false : _m, suppressAutoscroll = props.suppressAutoscroll, highlightedMessageId = props.highlightedMessageId, _o = props.jumpToLatestMessage, jumpToLatestMessage = _o === void 0 ? function () { return Promise.resolve(); } : _o;
    var _p = React.useState(null), listElement = _p[0], setListElement = _p[1];
    var _q = React.useState(null), ulElement = _q[0], setUlElement = _q[1];
    var customClasses = useChatContext('MessageList').customClasses;
    var _r = useComponentContext('MessageList'), _s = _r.EmptyStateIndicator, EmptyStateIndicator = _s === void 0 ? DefaultEmptyStateIndicator : _s, _t = _r.LoadingIndicator, LoadingIndicator = _t === void 0 ? DefaultLoadingIndicator : _t, _u = _r.MessageListNotifications, MessageListNotifications = _u === void 0 ? DefaultMessageListNotifications : _u, _v = _r.MessageNotification, MessageNotification = _v === void 0 ? DefaultMessageNotification : _v, _w = _r.TypingIndicator, TypingIndicator = _w === void 0 ? DefaultTypingIndicator : _w;
    var _x = useScrollLocationLogic({
        hasMoreNewer: hasMoreNewer,
        listElement: listElement,
        messages: messages,
        scrolledUpThreshold: props.scrolledUpThreshold,
        suppressAutoscroll: suppressAutoscroll,
    }), hasNewMessages = _x.hasNewMessages, isMessageListScrolledToBottom = _x.isMessageListScrolledToBottom, onMessageLoadCaptured = _x.onMessageLoadCaptured, onScroll = _x.onScroll, scrollToBottom = _x.scrollToBottom, wrapperRect = _x.wrapperRect;
    var _y = useEnrichedMessages({
        channel: channel,
        disableDateSeparator: disableDateSeparator,
        groupStyles: groupStyles,
        headerPosition: headerPosition,
        hideDeletedMessages: hideDeletedMessages,
        hideNewMessageSeparator: hideNewMessageSeparator,
        messages: messages,
        noGroupByUser: noGroupByUser,
    }), messageGroupStyles = _y.messageGroupStyles, enrichedMessages = _y.messages;
    var elements = useMessageListElements({
        enrichedMessages: enrichedMessages,
        internalMessageProps: {
            additionalMessageInputProps: props.additionalMessageInputProps,
            closeReactionSelectorOnClick: props.closeReactionSelectorOnClick,
            customMessageActions: props.customMessageActions,
            disableQuotedMessages: props.disableQuotedMessages,
            formatDate: props.formatDate,
            getDeleteMessageErrorNotification: props.getDeleteMessageErrorNotification,
            getFlagMessageErrorNotification: props.getFlagMessageErrorNotification,
            getFlagMessageSuccessNotification: props.getFlagMessageSuccessNotification,
            getMuteUserErrorNotification: props.getMuteUserErrorNotification,
            getMuteUserSuccessNotification: props.getMuteUserSuccessNotification,
            getPinMessageErrorNotification: props.getPinMessageErrorNotification,
            Message: props.Message,
            messageActions: messageActions,
            messageListRect: wrapperRect,
            onlySenderCanEdit: props.onlySenderCanEdit,
            onMentionsClick: props.onMentionsClick,
            onMentionsHover: props.onMentionsHover,
            onUserClick: props.onUserClick,
            onUserHover: props.onUserHover,
            openThread: props.openThread,
            pinPermissions: pinPermissions,
            renderText: props.renderText,
            retrySendMessage: props.retrySendMessage,
            unsafeHTML: unsafeHTML,
        },
        messageGroupStyles: messageGroupStyles,
        onMessageLoadCaptured: onMessageLoadCaptured,
        read: read,
        returnAllReadData: returnAllReadData,
        threadList: threadList,
    });
    var messageListClass = (customClasses === null || customClasses === void 0 ? void 0 : customClasses.messageList) || 'str-chat__list';
    var threadListClass = threadList
        ? (customClasses === null || customClasses === void 0 ? void 0 : customClasses.threadList) || 'str-chat__list--thread str-chat__thread-list'
        : '';
    var loadMore = React.useCallback(function () {
        if (loadMoreCallback) {
            loadMoreCallback(messageLimit);
        }
    }, [loadMoreCallback, messageLimit]);
    var loadMoreNewer = React.useCallback(function () {
        if (loadMoreNewerCallback) {
            loadMoreNewerCallback(messageLimit);
        }
    }, [loadMoreNewerCallback, messageLimit]);
    var scrollToBottomFromNotification = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!hasMoreNewer) return [3 /*break*/, 2];
                    return [4 /*yield*/, jumpToLatestMessage()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    scrollToBottom();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [scrollToBottom, hasMoreNewer]);
    React.useLayoutEffect(function () {
        if (highlightedMessageId) {
            var element = ulElement === null || ulElement === void 0 ? void 0 : ulElement.querySelector("[data-message-id='".concat(highlightedMessageId, "']"));
            element === null || element === void 0 ? void 0 : element.scrollIntoView({ block: 'center' });
        }
    }, [highlightedMessageId]);
    var showEmptyStateIndicator = elements.length === 0 && !threadList;
    return (React.createElement(React.Fragment, null,
        React.createElement(MessageListMainPanel, null,
            React.createElement("div", { className: "".concat(messageListClass, " ").concat(threadListClass), onScroll: onScroll, ref: setListElement, tabIndex: 0 }, showEmptyStateIndicator ? (React.createElement(EmptyStateIndicator, { key: 'empty-state-indicator', listType: threadList ? 'thread' : 'message' })) : (React.createElement(InfiniteScroll, __assign({ className: 'str-chat__reverse-infinite-scroll  str-chat__message-list-scroll', "data-testid": 'reverse-infinite-scroll', hasMore: props.hasMore, hasMoreNewer: props.hasMoreNewer, head: props.head, isLoading: props.loadingMore, loader: React.createElement("div", { className: 'str-chat__list__loading', key: 'loading-indicator' }, props.loadingMore && React.createElement(LoadingIndicator, { size: 20 })), loadMore: loadMore, loadMoreNewer: loadMoreNewer }, props.internalInfiniteScrollProps),
                React.createElement("ul", { className: 'str-chat__ul', ref: setUlElement }, elements),
                React.createElement(TypingIndicator, { threadList: threadList }),
                React.createElement("div", { key: 'bottom' }))))),
        React.createElement(MessageListNotifications, { hasNewMessages: hasNewMessages, isMessageListScrolledToBottom: isMessageListScrolledToBottom, isNotAtLatestMessageSet: hasMoreNewer, MessageNotification: MessageNotification, notifications: notifications, scrollToBottom: scrollToBottomFromNotification, threadList: threadList })));
};
/**
 * The MessageList component renders a list of Messages.
 * It is a consumer of the following contexts:
 * - [ChannelStateContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_state_context/)
 * - [ChannelActionContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_action_context/)
 * - [ComponentContext](https://getstream.io/chat/docs/sdk/react/contexts/component_context/)
 * - [TypingContext](https://getstream.io/chat/docs/sdk/react/contexts/typing_context/)
 */
export var MessageList = function (props) {
    var _a = useChannelActionContext('MessageList'), jumpToLatestMessage = _a.jumpToLatestMessage, loadMore = _a.loadMore, loadMoreNewer = _a.loadMoreNewer;
    var _b = useChannelStateContext('MessageList'), membersPropToNotPass = _b.members, // eslint-disable-line @typescript-eslint/no-unused-vars
    mutesPropToNotPass = _b.mutes, // eslint-disable-line @typescript-eslint/no-unused-vars
    watchersPropToNotPass = _b.watchers, // eslint-disable-line @typescript-eslint/no-unused-vars
    restChannelStateContext = __rest(_b, ["members", "mutes", "watchers"]);
    return (React.createElement(MessageListWithContext, __assign({ jumpToLatestMessage: jumpToLatestMessage, loadMore: loadMore, loadMoreNewer: loadMoreNewer }, restChannelStateContext, props)));
};
