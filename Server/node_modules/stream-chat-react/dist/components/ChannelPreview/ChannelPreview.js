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
import React, { useCallback, useEffect, useState } from 'react';
import { ChannelPreviewMessenger } from './ChannelPreviewMessenger';
import { useIsChannelMuted } from './hooks/useIsChannelMuted';
import { useChannelPreviewInfo } from './hooks/useChannelPreviewInfo';
import { getLatestMessagePreview } from './utils';
import { useChatContext } from '../../context/ChatContext';
import { useTranslationContext } from '../../context/TranslationContext';
export var ChannelPreview = function (props) {
    var channel = props.channel, _a = props.Preview, Preview = _a === void 0 ? ChannelPreviewMessenger : _a, channelUpdateCount = props.channelUpdateCount;
    var _b = useChatContext('ChannelPreview'), activeChannel = _b.channel, client = _b.client, setActiveChannel = _b.setActiveChannel;
    var _c = useTranslationContext('ChannelPreview'), t = _c.t, userLanguage = _c.userLanguage;
    var _d = useChannelPreviewInfo({ channel: channel }), displayImage = _d.displayImage, displayTitle = _d.displayTitle;
    var _e = useState(channel.state.messages[channel.state.messages.length - 1]), lastMessage = _e[0], setLastMessage = _e[1];
    var _f = useState(0), unread = _f[0], setUnread = _f[1];
    var isActive = (activeChannel === null || activeChannel === void 0 ? void 0 : activeChannel.cid) === channel.cid;
    var muted = useIsChannelMuted(channel).muted;
    useEffect(function () {
        var handleEvent = function (event) {
            if (!event.cid)
                return setUnread(0);
            if (channel.cid === event.cid)
                setUnread(0);
        };
        client.on('notification.mark_read', handleEvent);
        return function () { return client.off('notification.mark_read', handleEvent); };
    }, []);
    var refreshUnreadCount = useCallback(function () {
        if (isActive || muted) {
            setUnread(0);
        }
        else {
            setUnread(channel.countUnread());
        }
    }, [channel, isActive, muted]);
    useEffect(function () {
        refreshUnreadCount();
        var handleEvent = function (event) {
            if (event.message)
                setLastMessage(event.message);
            refreshUnreadCount();
        };
        channel.on('message.new', handleEvent);
        channel.on('message.updated', handleEvent);
        channel.on('message.deleted', handleEvent);
        return function () {
            channel.off('message.new', handleEvent);
            channel.off('message.updated', handleEvent);
            channel.off('message.deleted', handleEvent);
        };
    }, [refreshUnreadCount, channelUpdateCount]);
    if (!Preview)
        return null;
    var latestMessage = getLatestMessagePreview(channel, t, userLanguage);
    return (React.createElement(Preview, __assign({}, props, { active: isActive, displayImage: displayImage, displayTitle: displayTitle, lastMessage: lastMessage, latestMessage: latestMessage, setActiveChannel: setActiveChannel, unread: unread })));
};
