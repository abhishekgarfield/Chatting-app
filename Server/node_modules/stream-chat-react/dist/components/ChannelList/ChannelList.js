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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ChannelListMessenger } from './ChannelListMessenger';
import { useChannelDeletedListener } from './hooks/useChannelDeletedListener';
import { useChannelHiddenListener } from './hooks/useChannelHiddenListener';
import { useChannelTruncatedListener } from './hooks/useChannelTruncatedListener';
import { useChannelUpdatedListener } from './hooks/useChannelUpdatedListener';
import { useChannelVisibleListener } from './hooks/useChannelVisibleListener';
import { useConnectionRecoveredListener } from './hooks/useConnectionRecoveredListener';
import { useMessageNewListener } from './hooks/useMessageNewListener';
import { useMobileNavigation } from './hooks/useMobileNavigation';
import { useNotificationAddedToChannelListener } from './hooks/useNotificationAddedToChannelListener';
import { useNotificationMessageNewListener } from './hooks/useNotificationMessageNewListener';
import { useNotificationRemovedFromChannelListener } from './hooks/useNotificationRemovedFromChannelListener';
import { usePaginatedChannels } from './hooks/usePaginatedChannels';
import { useUserPresenceChangedListener } from './hooks/useUserPresenceChangedListener';
import { MAX_QUERY_CHANNELS_LIMIT, moveChannelUp } from './utils';
import { Avatar as DefaultAvatar } from '../Avatar/Avatar';
import { ChannelPreview } from '../ChannelPreview/ChannelPreview';
import { ChannelSearch as DefaultChannelSearch, } from '../ChannelSearch/ChannelSearch';
import { ChatDown } from '../ChatDown/ChatDown';
import { EmptyStateIndicator as DefaultEmptyStateIndicator, } from '../EmptyStateIndicator';
import { LoadingChannels } from '../Loading/LoadingChannels';
import { LoadMorePaginator } from '../LoadMore/LoadMorePaginator';
import { useChatContext } from '../../context/ChatContext';
var DEFAULT_FILTERS = {};
var DEFAULT_OPTIONS = {};
var DEFAULT_SORT = {};
var UnMemoizedChannelList = function (props) {
    var _a, _b;
    var additionalChannelSearchProps = props.additionalChannelSearchProps, _c = props.Avatar, Avatar = _c === void 0 ? DefaultAvatar : _c, allowNewMessagesFromUnfilteredChannels = props.allowNewMessagesFromUnfilteredChannels, channelRenderFilterFn = props.channelRenderFilterFn, _d = props.ChannelSearch, ChannelSearch = _d === void 0 ? DefaultChannelSearch : _d, customActiveChannel = props.customActiveChannel, _e = props.EmptyStateIndicator, EmptyStateIndicator = _e === void 0 ? DefaultEmptyStateIndicator : _e, filters = props.filters, _f = props.LoadingErrorIndicator, LoadingErrorIndicator = _f === void 0 ? ChatDown : _f, _g = props.LoadingIndicator, LoadingIndicator = _g === void 0 ? LoadingChannels : _g, _h = props.List, List = _h === void 0 ? ChannelListMessenger : _h, lockChannelOrder = props.lockChannelOrder, onAddedToChannel = props.onAddedToChannel, onChannelDeleted = props.onChannelDeleted, onChannelHidden = props.onChannelHidden, onChannelTruncated = props.onChannelTruncated, onChannelUpdated = props.onChannelUpdated, onChannelVisible = props.onChannelVisible, onMessageNew = props.onMessageNew, onRemovedFromChannel = props.onRemovedFromChannel, options = props.options, _j = props.Paginator, Paginator = _j === void 0 ? LoadMorePaginator : _j, Preview = props.Preview, renderChannels = props.renderChannels, _k = props.sendChannelsToList, sendChannelsToList = _k === void 0 ? false : _k, _l = props.setActiveChannelOnMount, setActiveChannelOnMount = _l === void 0 ? true : _l, _m = props.showChannelSearch, showChannelSearch = _m === void 0 ? false : _m, _o = props.sort, sort = _o === void 0 ? DEFAULT_SORT : _o, _p = props.watchers, watchers = _p === void 0 ? {} : _p;
    var _q = useChatContext('ChannelList'), channel = _q.channel, channelsQueryState = _q.channelsQueryState, client = _q.client, closeMobileNav = _q.closeMobileNav, customClasses = _q.customClasses, _r = _q.navOpen, navOpen = _r === void 0 ? false : _r, setActiveChannel = _q.setActiveChannel, theme = _q.theme, useImageFlagEmojisOnWindows = _q.useImageFlagEmojisOnWindows;
    var channelListRef = useRef(null);
    var _s = useState(0), channelUpdateCount = _s[0], setChannelUpdateCount = _s[1];
    var _t = useState(false), searchActive = _t[0], setSearchActive = _t[1];
    /**
     * Set a channel with id {customActiveChannel} as active and move it to the top of the list.
     * If customActiveChannel prop is absent, then set the first channel in list as active channel.
     */
    var activeChannelHandler = function (channels, setChannels) { return __awaiter(void 0, void 0, void 0, function () {
        var customActiveChannelObject, newChannels;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!channels.length || channels.length > ((options === null || options === void 0 ? void 0 : options.limit) || MAX_QUERY_CHANNELS_LIMIT)) {
                        return [2 /*return*/];
                    }
                    if (!customActiveChannel) return [3 /*break*/, 3];
                    customActiveChannelObject = channels.find(function (chan) { return chan.id === customActiveChannel; });
                    if (!!customActiveChannelObject) return [3 /*break*/, 2];
                    return [4 /*yield*/, client.queryChannels({ id: customActiveChannel })];
                case 1:
                    //@ts-expect-error
                    customActiveChannelObject = (_a.sent())[0];
                    _a.label = 2;
                case 2:
                    if (customActiveChannelObject) {
                        setActiveChannel(customActiveChannelObject, watchers);
                        newChannels = moveChannelUp({
                            activeChannel: customActiveChannelObject,
                            channels: channels,
                            cid: customActiveChannelObject.cid,
                        });
                        setChannels(newChannels);
                    }
                    return [2 /*return*/];
                case 3:
                    if (setActiveChannelOnMount) {
                        setActiveChannel(channels[0], watchers);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    /**
     * For some events, inner properties on the channel will update but the shallow comparison will not
     * force a re-render. Incrementing this dummy variable ensures the channel previews update.
     */
    var forceUpdate = function () { return setChannelUpdateCount(function (count) { return count + 1; }); };
    var onSearch = useCallback(function (event) {
        var _a;
        if (!event.target.value) {
            setSearchActive(false);
        }
        else {
            setSearchActive(true);
        }
        (_a = additionalChannelSearchProps === null || additionalChannelSearchProps === void 0 ? void 0 : additionalChannelSearchProps.onSearch) === null || _a === void 0 ? void 0 : _a.call(additionalChannelSearchProps, event);
    }, []);
    var onSearchExit = useCallback(function () {
        var _a;
        setSearchActive(false);
        (_a = additionalChannelSearchProps === null || additionalChannelSearchProps === void 0 ? void 0 : additionalChannelSearchProps.onSearchExit) === null || _a === void 0 ? void 0 : _a.call(additionalChannelSearchProps);
    }, []);
    var _u = usePaginatedChannels(client, filters || DEFAULT_FILTERS, sort || DEFAULT_SORT, options || DEFAULT_OPTIONS, activeChannelHandler), channels = _u.channels, hasNextPage = _u.hasNextPage, loadNextPage = _u.loadNextPage, setChannels = _u.setChannels;
    var loadedChannels = channelRenderFilterFn ? channelRenderFilterFn(channels) : channels;
    useMobileNavigation(channelListRef, navOpen, closeMobileNav);
    useMessageNewListener(setChannels, lockChannelOrder, allowNewMessagesFromUnfilteredChannels);
    useNotificationMessageNewListener(setChannels, onMessageNew, allowNewMessagesFromUnfilteredChannels);
    useNotificationAddedToChannelListener(setChannels, onAddedToChannel, allowNewMessagesFromUnfilteredChannels);
    useNotificationRemovedFromChannelListener(setChannels, onRemovedFromChannel);
    useChannelDeletedListener(setChannels, onChannelDeleted);
    useChannelHiddenListener(setChannels, onChannelHidden);
    useChannelVisibleListener(setChannels, onChannelVisible);
    useChannelTruncatedListener(setChannels, onChannelTruncated, forceUpdate);
    useChannelUpdatedListener(setChannels, onChannelUpdated, forceUpdate);
    useConnectionRecoveredListener(forceUpdate);
    useUserPresenceChangedListener(setChannels);
    useEffect(function () {
        var handleEvent = function (event) {
            if (event.cid === (channel === null || channel === void 0 ? void 0 : channel.cid)) {
                setActiveChannel();
            }
        };
        client.on('channel.deleted', handleEvent);
        client.on('channel.hidden', handleEvent);
        return function () {
            client.off('channel.deleted', handleEvent);
            client.off('channel.hidden', handleEvent);
        };
    }, [channel === null || channel === void 0 ? void 0 : channel.cid]);
    var renderChannel = function (item) {
        var previewProps = {
            activeChannel: channel,
            Avatar: Avatar,
            channel: item,
            // forces the update of preview component on channel update
            channelUpdateCount: channelUpdateCount,
            key: item.id,
            Preview: Preview,
            setActiveChannel: setActiveChannel,
            watchers: watchers,
        };
        return React.createElement(ChannelPreview, __assign({}, previewProps));
    };
    var className = clsx((_a = customClasses === null || customClasses === void 0 ? void 0 : customClasses.chat) !== null && _a !== void 0 ? _a : 'str-chat', theme, (_b = customClasses === null || customClasses === void 0 ? void 0 : customClasses.channelList) !== null && _b !== void 0 ? _b : 'str-chat-channel-list str-chat__channel-list', {
        'str-chat--windows-flags': useImageFlagEmojisOnWindows && navigator.userAgent.match(/Win/),
        'str-chat-channel-list--open': navOpen,
    });
    var showChannelList = !searchActive || (additionalChannelSearchProps === null || additionalChannelSearchProps === void 0 ? void 0 : additionalChannelSearchProps.popupResults);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: className, ref: channelListRef },
            showChannelSearch && (React.createElement(ChannelSearch, __assign({ onSearch: onSearch, onSearchExit: onSearchExit, setChannels: setChannels }, additionalChannelSearchProps))),
            showChannelList && (React.createElement(List, { error: channelsQueryState.error, loadedChannels: sendChannelsToList ? loadedChannels : undefined, loading: channelsQueryState.queryInProgress === 'reload', LoadingErrorIndicator: LoadingErrorIndicator, LoadingIndicator: LoadingIndicator, setChannels: setChannels }, !(loadedChannels === null || loadedChannels === void 0 ? void 0 : loadedChannels.length) ? (React.createElement(EmptyStateIndicator, { listType: 'channel' })) : (React.createElement(Paginator, { hasNextPage: hasNextPage, loadNextPage: loadNextPage, refreshing: channelsQueryState.queryInProgress === 'load-more' }, renderChannels
                ? renderChannels(loadedChannels, renderChannel)
                : loadedChannels.map(function (channel) { return renderChannel(channel); }))))))));
};
/**
 * Renders a preview list of Channels, allowing you to select the Channel you want to open
 */
export var ChannelList = React.memo(UnMemoizedChannelList);
