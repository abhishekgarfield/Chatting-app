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
import React, { Suspense, useState } from 'react';
import clsx from 'clsx';
import { useEmojiContext } from '../../context/EmojiContext';
import { useMessageContext } from '../../context/MessageContext';
import { useChatContext } from '../../context/ChatContext';
import { useProcessReactions } from './hooks/useProcessReactions';
import { PopperTooltip } from '../Tooltip';
import { useEnterLeaveHandlers } from '../Tooltip/hooks';
var ButtonWithTooltip = function (_a) {
    var children = _a.children, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, rest = __rest(_a, ["children", "onMouseEnter", "onMouseLeave"]);
    var _b = useState(null), referenceElement = _b[0], setReferenceElement = _b[1];
    var _c = useEnterLeaveHandlers({
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
    }), handleEnter = _c.handleEnter, handleLeave = _c.handleLeave, tooltipVisible = _c.tooltipVisible;
    var themeVersion = useChatContext('ButtonWithTooltip').themeVersion;
    return (React.createElement(React.Fragment, null,
        themeVersion === '2' && (React.createElement(PopperTooltip, { referenceElement: referenceElement, visible: tooltipVisible }, rest.title)),
        React.createElement("button", __assign({ onMouseEnter: handleEnter, onMouseLeave: handleLeave, ref: setReferenceElement }, rest), children)));
};
var UnMemoizedReactionsList = function (props) {
    var onClick = props.onClick, _a = props.reverse, reverse = _a === void 0 ? false : _a, rest = __rest(props, ["onClick", "reverse"]);
    var _b = useEmojiContext('ReactionsList'), Emoji = _b.Emoji, emojiConfig = _b.emojiConfig;
    var onReactionListClick = useMessageContext('ReactionsList').onReactionListClick;
    var _c = useProcessReactions(__assign({ emojiConfig: emojiConfig }, rest)), additionalEmojiProps = _c.additionalEmojiProps, aggregatedUserNamesByType = _c.aggregatedUserNamesByType, emojiData = _c.emojiData, getEmojiByReactionType = _c.getEmojiByReactionType, iHaveReactedWithReaction = _c.iHaveReactedWithReaction, latestReactions = _c.latestReactions, latestReactionTypes = _c.latestReactionTypes, reactionCounts = _c.reactionCounts, supportedReactionsArePresent = _c.supportedReactionsArePresent, totalReactionCount = _c.totalReactionCount;
    if (!latestReactions.length)
        return null;
    if (!supportedReactionsArePresent)
        return null;
    return (React.createElement("div", { "aria-label": 'Reaction list', className: clsx('str-chat__reaction-list str-chat__message-reactions-container', {
            'str-chat__reaction-list--reverse': reverse,
        }), "data-testid": 'reaction-list', onClick: onClick || onReactionListClick, onKeyUp: onClick || onReactionListClick, role: 'figure' },
        React.createElement("ul", { className: 'str-chat__message-reactions' },
            latestReactionTypes.map(function (reactionType) {
                var emojiObject = getEmojiByReactionType(reactionType);
                var isOwnReaction = iHaveReactedWithReaction(reactionType);
                return emojiObject ? (React.createElement("li", { className: clsx('str-chat__message-reaction', {
                        'str-chat__message-reaction-own': isOwnReaction,
                    }), key: emojiObject.id },
                    React.createElement(ButtonWithTooltip, { "aria-label": "Reactions: ".concat(reactionType), title: aggregatedUserNamesByType[reactionType].join(', '), type: 'button' },
                        React.createElement(Suspense, { fallback: null },
                            React.createElement("span", { className: 'str-chat__message-reaction-emoji' },
                                React.createElement(Emoji, __assign({ data: emojiData, emoji: emojiObject, size: 16 }, additionalEmojiProps)))),
                        "\u00A0",
                        React.createElement("span", { className: 'str-chat__message-reaction-count', "data-testclass": 'reaction-list-reaction-count' }, reactionCounts[reactionType])))) : null;
            }),
            React.createElement("li", null,
                React.createElement("span", { className: 'str-chat__reaction-list--counter' }, totalReactionCount)))));
};
/**
 * Component that displays a list of reactions on a message.
 */
export var ReactionsList = React.memo(UnMemoizedReactionsList);
