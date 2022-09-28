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
import { useProcessReactions } from './hooks/useProcessReactions';
var UnMemoizedSimpleReactionsList = function (props) {
    var propHandleReaction = props.handleReaction, rest = __rest(props, ["handleReaction"]);
    var _a = useEmojiContext('SimpleReactionsList'), Emoji = _a.Emoji, emojiConfig = _a.emojiConfig;
    var contextHandleReaction = useMessageContext('SimpleReactionsList').handleReaction;
    var _b = useProcessReactions(__assign({ emojiConfig: emojiConfig }, rest)), additionalEmojiProps = _b.additionalEmojiProps, emojiData = _b.emojiData, getEmojiByReactionType = _b.getEmojiByReactionType, iHaveReactedWithReaction = _b.iHaveReactedWithReaction, latestReactions = _b.latestReactions, latestReactionTypes = _b.latestReactionTypes, supportedReactionsArePresent = _b.supportedReactionsArePresent, totalReactionCount = _b.totalReactionCount;
    var _c = useState(undefined), tooltipReactionType = _c[0], setTooltipReactionType = _c[1];
    var handleReaction = propHandleReaction || contextHandleReaction;
    if (!latestReactions.length)
        return null;
    if (!supportedReactionsArePresent)
        return null;
    var getUsersPerReactionType = function (type) {
        return latestReactions
            .map(function (reaction) {
            var _a, _b;
            if (reaction.type === type) {
                return ((_a = reaction.user) === null || _a === void 0 ? void 0 : _a.name) || ((_b = reaction.user) === null || _b === void 0 ? void 0 : _b.id);
            }
            return null;
        })
            .filter(Boolean);
    };
    return (React.createElement("div", { className: 'str-chat__message-reactions-container' },
        React.createElement("ul", { className: 'str-chat__simple-reactions-list str-chat__message-reactions', "data-testid": 'simple-reaction-list', onMouseLeave: function () { return setTooltipReactionType(undefined); } },
            latestReactionTypes.map(function (reactionType, i) {
                var _a;
                var emojiObject = getEmojiByReactionType(reactionType);
                var isOwnReaction = iHaveReactedWithReaction(reactionType);
                return emojiObject ? (React.createElement("li", { className: clsx('str-chat__simple-reactions-list-item', {
                        'str-chat__message-reaction-own': isOwnReaction,
                    }), key: "".concat(emojiObject.id, "-").concat(i), onClick: function (event) { return handleReaction(reactionType, event); }, onKeyUp: function (event) { return handleReaction(reactionType, event); } },
                    React.createElement("span", { onMouseEnter: function () { return setTooltipReactionType(reactionType); } },
                        React.createElement(Suspense, { fallback: null },
                            React.createElement(Emoji, __assign({ data: emojiData, emoji: emojiObject, size: 13 }, additionalEmojiProps))),
                        "\u00A0"),
                    tooltipReactionType === emojiObject.id && (React.createElement("div", { className: 'str-chat__simple-reactions-list-tooltip str-chat__tooltip' },
                        React.createElement("div", { className: 'arrow' }), (_a = getUsersPerReactionType(tooltipReactionType)) === null || _a === void 0 ? void 0 :
                        _a.join(', '))))) : null;
            }),
            React.createElement("li", { className: 'str-chat__simple-reactions-list-item--last-number' }, totalReactionCount))));
};
export var SimpleReactionsList = React.memo(UnMemoizedSimpleReactionsList);
