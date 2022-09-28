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
import React from 'react';
import ReactPlayer from 'react-player';
import clsx from 'clsx';
import { AttachmentActions as DefaultAttachmentActions } from './AttachmentActions';
import { Audio as DefaultAudio } from './Audio';
import { Gallery as DefaultGallery, ImageComponent as DefaultImage } from '../Gallery';
import { Card as DefaultCard } from './Card';
import { FileAttachment as DefaultFile } from './FileAttachment';
import { isGalleryAttachmentType, isSvgAttachment, } from './utils';
export var AttachmentWithinContainer = function (_a) {
    var _b;
    var _c;
    var attachment = _a.attachment, children = _a.children, componentType = _a.componentType;
    var isGAT = isGalleryAttachmentType(attachment);
    var extra = '';
    if (!isGAT) {
        extra =
            componentType === 'card' && !(attachment === null || attachment === void 0 ? void 0 : attachment.image_url) && !(attachment === null || attachment === void 0 ? void 0 : attachment.thumb_url)
                ? 'no-image'
                : ((_c = attachment === null || attachment === void 0 ? void 0 : attachment.actions) === null || _c === void 0 ? void 0 : _c.length)
                    ? 'actions'
                    : '';
    }
    var classNames = clsx('str-chat__message-attachment', (_b = {},
        _b["str-chat__message-attachment--".concat(componentType)] = componentType,
        _b["str-chat__message-attachment--".concat(attachment === null || attachment === void 0 ? void 0 : attachment.type)] = attachment === null || attachment === void 0 ? void 0 : attachment.type,
        _b["str-chat__message-attachment--".concat(componentType, "--").concat(extra)] = componentType && extra,
        _b['str-chat__message-attachment--svg-image'] = isSvgAttachment(attachment),
        _b['str-chat__message-attachment-with-actions'] = extra === 'actions',
        _b));
    return React.createElement("div", { className: classNames }, children);
};
export var AttachmentActionsContainer = function (_a) {
    var _b;
    var actionHandler = _a.actionHandler, attachment = _a.attachment, _c = _a.AttachmentActions, AttachmentActions = _c === void 0 ? DefaultAttachmentActions : _c;
    if (!((_b = attachment.actions) === null || _b === void 0 ? void 0 : _b.length))
        return null;
    return (React.createElement(AttachmentActions, __assign({}, attachment, { actionHandler: actionHandler, actions: attachment.actions, id: attachment.id || '', text: attachment.text || '' })));
};
export var GalleryContainer = function (_a) {
    var attachment = _a.attachment, _b = _a.Gallery, Gallery = _b === void 0 ? DefaultGallery : _b;
    return (React.createElement(AttachmentWithinContainer, { attachment: attachment, componentType: 'gallery' },
        React.createElement(Gallery, { images: attachment.images || [], key: 'gallery' })));
};
export var ImageContainer = function (props) {
    var attachment = props.attachment, _a = props.Image, Image = _a === void 0 ? DefaultImage : _a;
    var componentType = 'image';
    if (attachment.actions && attachment.actions.length) {
        return (React.createElement(AttachmentWithinContainer, { attachment: attachment, componentType: componentType },
            React.createElement("div", { className: 'str-chat__attachment' },
                React.createElement(Image, __assign({}, attachment)),
                React.createElement(AttachmentActionsContainer, __assign({}, props)))));
    }
    return (React.createElement(AttachmentWithinContainer, { attachment: attachment, componentType: componentType },
        React.createElement(Image, __assign({}, attachment))));
};
export var CardContainer = function (props) {
    var attachment = props.attachment, _a = props.Card, Card = _a === void 0 ? DefaultCard : _a;
    var componentType = 'card';
    if (attachment.actions && attachment.actions.length) {
        return (React.createElement(AttachmentWithinContainer, { attachment: attachment, componentType: componentType },
            React.createElement("div", { className: 'str-chat__attachment' },
                React.createElement(Card, __assign({}, attachment)),
                React.createElement(AttachmentActionsContainer, __assign({}, props)))));
    }
    return (React.createElement(AttachmentWithinContainer, { attachment: attachment, componentType: componentType },
        React.createElement(Card, __assign({}, attachment))));
};
export var FileContainer = function (_a) {
    var attachment = _a.attachment, _b = _a.File, File = _b === void 0 ? DefaultFile : _b;
    if (!attachment.asset_url)
        return null;
    return (React.createElement(AttachmentWithinContainer, { attachment: attachment, componentType: 'file' },
        React.createElement(File, { attachment: attachment })));
};
export var AudioContainer = function (_a) {
    var attachment = _a.attachment, _b = _a.Audio, Audio = _b === void 0 ? DefaultAudio : _b;
    return (React.createElement(AttachmentWithinContainer, { attachment: attachment, componentType: 'audio' },
        React.createElement("div", { className: 'str-chat__attachment' },
            React.createElement(Audio, { og: attachment }))));
};
export var MediaContainer = function (props) {
    var _a;
    var attachment = props.attachment, _b = props.Media, Media = _b === void 0 ? ReactPlayer : _b;
    var componentType = 'media';
    if ((_a = attachment.actions) === null || _a === void 0 ? void 0 : _a.length) {
        return (React.createElement(AttachmentWithinContainer, { attachment: attachment, componentType: componentType },
            React.createElement("div", { className: 'str-chat__attachment str-chat__attachment-media' },
                React.createElement("div", { className: 'str-chat__player-wrapper' },
                    React.createElement(Media, { className: 'react-player', controls: true, height: '100%', url: attachment.asset_url, width: '100%' })),
                React.createElement(AttachmentActionsContainer, __assign({}, props)))));
    }
    return (React.createElement(AttachmentWithinContainer, { attachment: attachment, componentType: componentType },
        React.createElement("div", { className: 'str-chat__player-wrapper' },
            React.createElement(Media, { className: 'react-player', controls: true, height: '100%', url: attachment.asset_url, width: '100%' }))));
};
