import { useMemo } from 'react';
import { isDate, isDayOrMoment } from '../../../context/TranslationContext';
export var useCreateChannelStateContext = function (value) {
    var _a;
    var acceptedFiles = value.acceptedFiles, channel = value.channel, _b = value.channelCapabilitiesArray, channelCapabilitiesArray = _b === void 0 ? [] : _b, channelConfig = value.channelConfig, dragAndDropWindow = value.dragAndDropWindow, giphyVersion = value.giphyVersion, error = value.error, hasMore = value.hasMore, hasMoreNewer = value.hasMoreNewer, suppressAutoscroll = value.suppressAutoscroll, highlightedMessageId = value.highlightedMessageId, loading = value.loading, loadingMore = value.loadingMore, maxNumberOfFiles = value.maxNumberOfFiles, members = value.members, _c = value.messages, messages = _c === void 0 ? [] : _c, multipleUploads = value.multipleUploads, mutes = value.mutes, notifications = value.notifications, pinnedMessages = value.pinnedMessages, quotedMessage = value.quotedMessage, _d = value.read, read = _d === void 0 ? {} : _d, skipMessageDataMemoization = value.skipMessageDataMemoization, thread = value.thread, threadHasMore = value.threadHasMore, threadLoadingMore = value.threadLoadingMore, _e = value.threadMessages, threadMessages = _e === void 0 ? [] : _e, watcherCount = value.watcherCount, watcher_count = value.watcher_count, watchers = value.watchers;
    var channelId = channel.cid;
    var lastRead = channel.initialized && ((_a = channel.lastRead()) === null || _a === void 0 ? void 0 : _a.getTime());
    var membersLength = Object.keys(members || []).length;
    var notificationsLength = notifications.length;
    var readUsers = Object.values(read);
    var readUsersLength = readUsers.length;
    var readUsersLastReads = readUsers.map(function (_a) {
        var last_read = _a.last_read;
        return last_read.toISOString();
    }).join();
    var threadMessagesLength = threadMessages === null || threadMessages === void 0 ? void 0 : threadMessages.length;
    var channelCapabilities = {};
    channelCapabilitiesArray.forEach(function (capability) {
        channelCapabilities[capability] = true;
    });
    var memoizedMessageData = skipMessageDataMemoization
        ? messages
        : messages
            .map(function (_a) {
            var deleted_at = _a.deleted_at, latest_reactions = _a.latest_reactions, pinned = _a.pinned, reply_count = _a.reply_count, status = _a.status, updated_at = _a.updated_at, user = _a.user;
            return "".concat(deleted_at).concat(latest_reactions ? latest_reactions.map(function (_a) {
                var type = _a.type;
                return type;
            }).join() : '').concat(pinned).concat(reply_count).concat(status).concat(updated_at && (isDayOrMoment(updated_at) || isDate(updated_at))
                ? updated_at.toISOString()
                : updated_at || '').concat(user === null || user === void 0 ? void 0 : user.updated_at);
        })
            .join();
    var memoizedThreadMessageData = threadMessages
        .map(function (_a) {
        var deleted_at = _a.deleted_at, latest_reactions = _a.latest_reactions, pinned = _a.pinned, status = _a.status, updated_at = _a.updated_at, user = _a.user;
        return "".concat(deleted_at).concat(latest_reactions ? latest_reactions.map(function (_a) {
            var type = _a.type;
            return type;
        }).join() : '').concat(pinned).concat(status).concat(updated_at && (isDayOrMoment(updated_at) || isDate(updated_at))
            ? updated_at.toISOString()
            : updated_at || '').concat(user === null || user === void 0 ? void 0 : user.updated_at);
    })
        .join();
    var channelStateContext = useMemo(function () { return ({
        acceptedFiles: acceptedFiles,
        channel: channel,
        channelCapabilities: channelCapabilities,
        channelConfig: channelConfig,
        dragAndDropWindow: dragAndDropWindow,
        error: error,
        giphyVersion: giphyVersion,
        hasMore: hasMore,
        hasMoreNewer: hasMoreNewer,
        highlightedMessageId: highlightedMessageId,
        loading: loading,
        loadingMore: loadingMore,
        maxNumberOfFiles: maxNumberOfFiles,
        members: members,
        messages: messages,
        multipleUploads: multipleUploads,
        mutes: mutes,
        notifications: notifications,
        pinnedMessages: pinnedMessages,
        quotedMessage: quotedMessage,
        read: read,
        suppressAutoscroll: suppressAutoscroll,
        thread: thread,
        threadHasMore: threadHasMore,
        threadLoadingMore: threadLoadingMore,
        threadMessages: threadMessages,
        watcher_count: watcher_count,
        watcherCount: watcherCount,
        watchers: watchers,
    }); }, [
        channelId,
        error,
        hasMore,
        hasMoreNewer,
        highlightedMessageId,
        lastRead,
        loading,
        loadingMore,
        membersLength,
        memoizedMessageData,
        memoizedThreadMessageData,
        notificationsLength,
        quotedMessage,
        readUsersLength,
        readUsersLastReads,
        skipMessageDataMemoization,
        suppressAutoscroll,
        thread,
        threadHasMore,
        threadLoadingMore,
        threadMessagesLength,
        watcherCount,
    ]);
    return channelStateContext;
};
