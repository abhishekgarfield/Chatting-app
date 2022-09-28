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
import React, { useEffect, useMemo, useState } from 'react';
import { FileUploadButton, ImageDropzone, UploadButton } from 'react-file-utils';
import clsx from 'clsx';
import { usePopper } from 'react-popper';
import { useDropzone } from 'react-dropzone';
import { nanoid } from 'nanoid';
import { EmojiPicker } from './EmojiPicker';
import { EmojiIconLarge as DefaultEmojiIcon, EmojiPickerIcon as DefaultEmojiPickerIcon, FileUploadIconFlat as DefaultFileUploadIcon, SendButton as DefaultSendButton, UploadIcon as DefaultUploadIcon, } from './icons';
import { QuotedMessagePreview as DefaultQuotedMessagePreview, QuotedMessagePreviewHeader, } from './QuotedMessagePreview';
import { AttachmentPreviewList } from './AttachmentPreviewList';
import { UploadsPreview } from './UploadsPreview';
import { ChatAutoComplete } from '../ChatAutoComplete/ChatAutoComplete';
import { Tooltip } from '../Tooltip/Tooltip';
import { useChatContext } from '../../context/ChatContext';
import { useChannelActionContext } from '../../context/ChannelActionContext';
import { useChannelStateContext } from '../../context/ChannelStateContext';
import { useTranslationContext } from '../../context/TranslationContext';
import { useMessageInputContext } from '../../context/MessageInputContext';
import { useComponentContext } from '../../context/ComponentContext';
import { CooldownTimer as DefaultCooldownTimer } from './CooldownTimer';
export var MessageInputFlat = function () {
    var quotedMessage = useChannelStateContext('MessageInputFlat').quotedMessage;
    var setQuotedMessage = useChannelActionContext('MessageInputFlat').setQuotedMessage;
    var _a = useChatContext('MessageInputFlat'), channel = _a.channel, themeVersion = _a.themeVersion;
    useEffect(function () {
        var handleQuotedMessageUpdate = function (e) {
            var _a;
            if (((_a = e.message) === null || _a === void 0 ? void 0 : _a.id) !== (quotedMessage === null || quotedMessage === void 0 ? void 0 : quotedMessage.id))
                return;
            if (e.type === 'message.deleted') {
                setQuotedMessage(undefined);
                return;
            }
            setQuotedMessage(e.message);
        };
        channel === null || channel === void 0 ? void 0 : channel.on('message.deleted', handleQuotedMessageUpdate);
        channel === null || channel === void 0 ? void 0 : channel.on('message.updated', handleQuotedMessageUpdate);
        return function () {
            channel === null || channel === void 0 ? void 0 : channel.off('message.deleted', handleQuotedMessageUpdate);
            channel === null || channel === void 0 ? void 0 : channel.off('message.updated', handleQuotedMessageUpdate);
        };
    }, [channel, quotedMessage]);
    return themeVersion === '2' ? (React.createElement(MessageInputV2, null)) : (React.createElement(MessageInputV1, null));
};
var MessageInputV1 = function () {
    var _a = useChannelStateContext('MessageInputFlat'), acceptedFiles = _a.acceptedFiles, multipleUploads = _a.multipleUploads, quotedMessage = _a.quotedMessage;
    var t = useTranslationContext('MessageInputFlat').t;
    var _b = useMessageInputContext('MessageInputFlat'), closeEmojiPicker = _b.closeEmojiPicker, cooldownRemaining = _b.cooldownRemaining, emojiPickerIsOpen = _b.emojiPickerIsOpen, handleSubmit = _b.handleSubmit, isUploadEnabled = _b.isUploadEnabled, maxFilesLeft = _b.maxFilesLeft, numberOfUploads = _b.numberOfUploads, openEmojiPicker = _b.openEmojiPicker, setCooldownRemaining = _b.setCooldownRemaining, uploadNewFiles = _b.uploadNewFiles;
    var _c = useComponentContext('MessageInputFlat'), _d = _c.CooldownTimer, CooldownTimer = _d === void 0 ? DefaultCooldownTimer : _d, _e = _c.EmojiIcon, EmojiIcon = _e === void 0 ? DefaultEmojiIcon : _e, _f = _c.FileUploadIcon, FileUploadIcon = _f === void 0 ? DefaultFileUploadIcon : _f, _g = _c.QuotedMessagePreview, QuotedMessagePreview = _g === void 0 ? DefaultQuotedMessagePreview : _g, _h = _c.SendButton, SendButton = _h === void 0 ? DefaultSendButton : _h;
    return (React.createElement("div", { className: clsx('str-chat__input-flat', 'str-chat__message-input', {
            'str-chat__input-flat--send-button-active': !!SendButton,
            'str-chat__input-flat-has-attachments': numberOfUploads,
            'str-chat__input-flat-quoted': quotedMessage && !quotedMessage.parent_id,
        }) },
        React.createElement(ImageDropzone, { accept: acceptedFiles, disabled: !isUploadEnabled || maxFilesLeft === 0 || !!cooldownRemaining, handleFiles: uploadNewFiles, maxNumberOfFiles: maxFilesLeft, multiple: multipleUploads },
            quotedMessage && !quotedMessage.parent_id && (React.createElement(QuotedMessagePreview, { quotedMessage: quotedMessage })),
            React.createElement("div", { className: 'str-chat__input-flat-wrapper' },
                isUploadEnabled && React.createElement(UploadsPreview, null),
                React.createElement("div", { className: 'str-chat__input-flat--textarea-wrapper' },
                    React.createElement("div", { className: 'str-chat__emojiselect-wrapper' },
                        React.createElement(Tooltip, null, emojiPickerIsOpen
                            ? t('Close emoji picker')
                            : t('Open emoji picker')),
                        React.createElement("button", { "aria-label": 'Emoji picker', className: 'str-chat__input-flat-emojiselect', onClick: emojiPickerIsOpen ? closeEmojiPicker : openEmojiPicker }, cooldownRemaining ? (React.createElement("div", { className: 'str-chat__input-flat-cooldown' },
                            React.createElement(CooldownTimer, { cooldownInterval: cooldownRemaining, setCooldownRemaining: setCooldownRemaining }))) : (React.createElement(EmojiIcon, null)))),
                    React.createElement(EmojiPicker, null),
                    React.createElement(ChatAutoComplete, null),
                    isUploadEnabled && !cooldownRemaining && (React.createElement("div", { className: 'str-chat__fileupload-wrapper', "data-testid": 'fileinput' },
                        React.createElement(Tooltip, null, maxFilesLeft
                            ? t('Attach files')
                            : t("You've reached the maximum number of files")),
                        React.createElement(FileUploadButton, { accepts: acceptedFiles, disabled: maxFilesLeft === 0, handleFiles: uploadNewFiles, multiple: multipleUploads },
                            React.createElement("span", { className: 'str-chat__input-flat-fileupload' },
                                React.createElement(FileUploadIcon, null)))))),
                !cooldownRemaining && React.createElement(SendButton, { sendMessage: handleSubmit })))));
};
var MessageInputV2 = function () {
    var _a = useChannelStateContext('MessageInputV2'), _b = _a.acceptedFiles, acceptedFiles = _b === void 0 ? [] : _b, multipleUploads = _a.multipleUploads, quotedMessage = _a.quotedMessage;
    var t = useTranslationContext('MessageInputV2').t;
    var _c = useMessageInputContext('MessageInputV2'), closeEmojiPicker = _c.closeEmojiPicker, cooldownRemaining = _c.cooldownRemaining, emojiPickerIsOpen = _c.emojiPickerIsOpen, handleSubmit = _c.handleSubmit, isUploadEnabled = _c.isUploadEnabled, maxFilesLeft = _c.maxFilesLeft, message = _c.message, numberOfUploads = _c.numberOfUploads, openEmojiPicker = _c.openEmojiPicker, setCooldownRemaining = _c.setCooldownRemaining, text = _c.text, uploadNewFiles = _c.uploadNewFiles;
    var _d = useComponentContext('MessageInputV2'), _e = _d.CooldownTimer, CooldownTimer = _e === void 0 ? DefaultCooldownTimer : _e, _f = _d.EmojiIcon, EmojiIcon = _f === void 0 ? DefaultEmojiPickerIcon : _f, _g = _d.FileUploadIcon, FileUploadIcon = _g === void 0 ? DefaultUploadIcon : _g, _h = _d.QuotedMessagePreview, QuotedMessagePreview = _h === void 0 ? DefaultQuotedMessagePreview : _h, _j = _d.SendButton, SendButton = _j === void 0 ? DefaultSendButton : _j;
    var _k = useState(null), referenceElement = _k[0], setReferenceElement = _k[1];
    var _l = useState(null), popperElement = _l[0], setPopperElement = _l[1];
    var _m = usePopper(referenceElement, popperElement, {
        placement: 'top-end',
    }), attributes = _m.attributes, styles = _m.styles;
    var id = useMemo(function () { return nanoid(); }, []);
    var accept = useMemo(function () {
        return acceptedFiles.reduce(function (mediaTypeMap, mediaType) {
            var _a;
            (_a = mediaTypeMap[mediaType]) !== null && _a !== void 0 ? _a : (mediaTypeMap[mediaType] = []);
            return mediaTypeMap;
        }, {});
    }, [acceptedFiles]);
    var _o = useDropzone({
        accept: accept,
        disabled: !isUploadEnabled || maxFilesLeft === 0,
        multiple: multipleUploads,
        noClick: true,
        onDrop: uploadNewFiles,
    }), getRootProps = _o.getRootProps, isDragActive = _o.isDragActive, isDragReject = _o.isDragReject;
    // TODO: "!message" condition is a temporary fix for shared
    // state when editing a message (fix shared state issue)
    var displayQuotedMessage = !message && quotedMessage && !quotedMessage.parent_id;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", __assign({}, getRootProps({ className: 'str-chat__message-input' })),
            isDragActive && (React.createElement("div", { className: clsx('str-chat__dropzone-container', {
                    'str-chat__dropzone-container--not-accepted': isDragReject,
                }) },
                !isDragReject && React.createElement("p", null, t('Drag your files here')),
                isDragReject && React.createElement("p", null, t('Some of the files will not be accepted')))),
            displayQuotedMessage && React.createElement(QuotedMessagePreviewHeader, null),
            React.createElement("div", { className: 'str-chat__message-input-inner' },
                React.createElement("div", { className: 'str-chat__file-input-container', "data-testid": 'file-upload-button' },
                    React.createElement(UploadButton, { accept: acceptedFiles === null || acceptedFiles === void 0 ? void 0 : acceptedFiles.join(','), "aria-label": 'File upload', className: 'str-chat__file-input', "data-testid": 'file-input', disabled: !isUploadEnabled || maxFilesLeft === 0, id: id, multiple: multipleUploads, onFileChange: uploadNewFiles }),
                    React.createElement("label", { className: 'str-chat__file-input-label', htmlFor: id },
                        React.createElement(FileUploadIcon, null))),
                React.createElement("div", { className: 'str-chat__message-textarea-container' },
                    displayQuotedMessage && React.createElement(QuotedMessagePreview, { quotedMessage: quotedMessage }),
                    isUploadEnabled && !!numberOfUploads && React.createElement(AttachmentPreviewList, null),
                    React.createElement("div", { className: 'str-chat__message-textarea-with-emoji-picker' },
                        React.createElement(ChatAutoComplete, null),
                        React.createElement("div", { className: 'str-chat__message-textarea-emoji-picker' },
                            emojiPickerIsOpen && (React.createElement("div", __assign({ className: 'str-chat__message-textarea-emoji-picker-container', style: styles.popper }, attributes.popper, { ref: setPopperElement }),
                                React.createElement(EmojiPicker, null))),
                            React.createElement("button", { "aria-label": 'Emoji picker', className: 'str-chat__emoji-picker-button', onClick: emojiPickerIsOpen ? closeEmojiPicker : openEmojiPicker, ref: setReferenceElement, type: 'button' },
                                React.createElement(EmojiIcon, null))))),
                !message && (React.createElement(React.Fragment, null, cooldownRemaining ? (React.createElement(CooldownTimer, { cooldownInterval: cooldownRemaining, setCooldownRemaining: setCooldownRemaining })) : (React.createElement(SendButton, { disabled: !numberOfUploads && !text.length, sendMessage: handleSubmit }))))))));
};
