import React from 'react';
import clsx from 'clsx';
import { Avatar as DefaultAvatar } from '../Avatar';
import { useComponentContext } from '../../context/ComponentContext';
import { useMessageContext } from '../../context/MessageContext';
import { useTranslationContext } from '../../context/TranslationContext';
import { useChannelActionContext } from '../../context/ChannelActionContext';
export var QuotedMessage = function () {
    var _a, _b;
    var _c = useComponentContext('QuotedMessage'), Attachment = _c.Attachment, ContextAvatar = _c.Avatar;
    var _d = useMessageContext('QuotedMessage'), isMyMessage = _d.isMyMessage, message = _d.message;
    var userLanguage = useTranslationContext('QuotedMessage').userLanguage;
    var jumpToMessage = useChannelActionContext('QuotedMessage').jumpToMessage;
    var Avatar = ContextAvatar || DefaultAvatar;
    var quoted_message = message.quoted_message;
    if (!quoted_message)
        return null;
    var quotedMessageText = ((_a = quoted_message.i18n) === null || _a === void 0 ? void 0 : _a["".concat(userLanguage, "_text")]) ||
        quoted_message.text;
    // @ts-expect-error
    var quotedMessageAttachment = quoted_message.attachments.length
        ? // @ts-expect-error
            quoted_message.attachments[0]
        : null;
    if (!quotedMessageText && !quotedMessageAttachment)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: clsx('str-chat__quoted-message-preview quoted-message', { mine: isMyMessage() }), onClickCapture: function (e) {
                e.stopPropagation();
                e.preventDefault();
                jumpToMessage(quoted_message.id);
            } },
            quoted_message.user && (React.createElement(Avatar, { image: quoted_message.user.image, name: quoted_message.user.name || quoted_message.user.id, size: 20, user: quoted_message.user })),
            React.createElement("div", { className: 'quoted-message-inner str-chat__quoted-message-bubble' },
                quotedMessageAttachment && React.createElement(Attachment, { attachments: [quotedMessageAttachment] }),
                React.createElement("div", null, quotedMessageText))),
        ((_b = message.attachments) === null || _b === void 0 ? void 0 : _b.length) && message.quoted_message ? (React.createElement(Attachment, { attachments: message.attachments })) : null));
};
