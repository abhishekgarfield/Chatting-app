import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useChatContext } from '../../../context/ChatContext';
export var useUserRole = function (message, onlySenderCanEdit, disableQuotedMessages) {
    var _a, _b, _c;
    var _d = useChannelStateContext('useUserRole'), channel = _d.channel, _e = _d.channelCapabilities, channelCapabilities = _e === void 0 ? {} : _e, channelConfig = _d.channelConfig;
    var client = useChatContext('useUserRole').client;
    /**
     * @deprecated as it relies on `membership.role` check which is already deprecated and shouldn't be used anymore.
     * `isAdmin` will be removed in future release. See `channelCapabilities`.
     */
    var isAdmin = ((_a = client.user) === null || _a === void 0 ? void 0 : _a.role) === 'admin' || channel.state.membership.role === 'admin';
    /**
     * @deprecated as it relies on `membership.role` check which is already deprecated and shouldn't be used anymore.
     * `isOwner` will be removed in future release. See `channelCapabilities`.
     */
    var isOwner = channel.state.membership.role === 'owner';
    /**
     * @deprecated as it relies on `membership.role` check which is already deprecated and shouldn't be used anymore.
     * `isModerator` will be removed in future release. See `channelCapabilities`.
     */
    var isModerator = ((_b = client.user) === null || _b === void 0 ? void 0 : _b.role) === 'channel_moderator' ||
        channel.state.membership.role === 'channel_moderator' ||
        channel.state.membership.role === 'moderator' ||
        channel.state.membership.is_moderator === true ||
        channel.state.membership.channel_role === 'channel_moderator';
    var isMyMessage = client.userID === ((_c = message.user) === null || _c === void 0 ? void 0 : _c.id);
    var canEdit = (!onlySenderCanEdit && channelCapabilities['update-any-message']) ||
        (isMyMessage && channelCapabilities['update-own-message']);
    var canDelete = channelCapabilities['delete-any-message'] ||
        (isMyMessage && channelCapabilities['delete-own-message']);
    var canFlag = !isMyMessage;
    var canMute = !isMyMessage && (channelConfig === null || channelConfig === void 0 ? void 0 : channelConfig.mutes);
    var canQuote = !disableQuotedMessages && channelCapabilities['quote-message'];
    var canReact = (channelConfig === null || channelConfig === void 0 ? void 0 : channelConfig.reactions) !== false && channelCapabilities['send-reaction'];
    var canReply = (channelConfig === null || channelConfig === void 0 ? void 0 : channelConfig.replies) !== false && channelCapabilities['send-reply'];
    return {
        canDelete: canDelete,
        canEdit: canEdit,
        canFlag: canFlag,
        canMute: canMute,
        canQuote: canQuote,
        canReact: canReact,
        canReply: canReply,
        isAdmin: isAdmin,
        isModerator: isModerator,
        isMyMessage: isMyMessage,
        isOwner: isOwner,
    };
};
