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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useMemo } from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { isAudioAttachment, isFileAttachment, isMediaAttachment, isScrapedContent, isUploadedImage, } from './utils';
import { AudioContainer, CardContainer, FileContainer, GalleryContainer, ImageContainer, MediaContainer, } from './AttachmentContainer';
var CONTAINER_MAP = {
    audio: AudioContainer,
    card: CardContainer,
    file: FileContainer,
    media: MediaContainer,
};
export var ATTACHMENT_GROUPS_ORDER = [
    'card',
    'gallery',
    'image',
    'media',
    'audio',
    'file',
];
/**
 * A component used for rendering message attachments. By default, the component supports: AttachmentActions, Audio, Card, File, Gallery, Image, and Video
 */
export var Attachment = function (props) {
    var attachments = props.attachments;
    var groupedAttachments = useMemo(function () { return renderGroupedAttachments(props); }, [attachments]);
    return (React.createElement("div", { className: 'str-chat__attachment-list' }, ATTACHMENT_GROUPS_ORDER.reduce(function (acc, groupName) { return __spreadArray(__spreadArray([], acc, true), groupedAttachments[groupName], true); }, [])));
};
var renderGroupedAttachments = function (_a) {
    var attachments = _a.attachments, rest = __rest(_a, ["attachments"]);
    var uploadedImages = [];
    var containers = attachments.reduce(function (acc, attachment) {
        if (isUploadedImage(attachment)) {
            uploadedImages.push(__assign(__assign({}, attachment), { image_url: sanitizeUrl(attachment.image_url), thumb_url: sanitizeUrl(attachment.thumb_url) }));
        }
        else {
            var attachmentType = getAttachmentType(attachment);
            if (attachmentType) {
                var Container = CONTAINER_MAP[attachmentType];
                acc[attachmentType].push(React.createElement(Container, __assign({ key: "".concat(attachmentType, "-").concat(acc[attachmentType].length) }, rest, { attachment: attachment })));
            }
        }
        return acc;
    }, {
        audio: [],
        card: [],
        file: [],
        gallery: [],
        image: [],
        media: [],
    });
    if (uploadedImages.length > 1) {
        containers['gallery'] = [
            React.createElement(GalleryContainer, __assign({ key: 'gallery-container' }, rest, { attachment: {
                    images: uploadedImages,
                    type: 'gallery',
                } })),
        ];
    }
    else if (uploadedImages.length === 1) {
        containers['image'] = [
            React.createElement(ImageContainer, __assign({ key: 'image-container' }, rest, { attachment: uploadedImages[0] })),
        ];
    }
    return containers;
};
var getAttachmentType = function (attachment) {
    if (isScrapedContent(attachment)) {
        return 'card';
    }
    else if (isMediaAttachment(attachment)) {
        return 'media';
    }
    else if (isAudioAttachment(attachment)) {
        return 'audio';
    }
    else if (isFileAttachment(attachment)) {
        return 'file';
    }
    return null;
};
