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
import React, { useState } from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { Modal } from '../Modal';
import { ModalGallery as DefaultModalGallery } from './ModalGallery';
import { useComponentContext } from '../../context';
/**
 * A simple component that displays an image.
 */
export var ImageComponent = function (props) {
    var _a = props.dimensions, dimensions = _a === void 0 ? {} : _a, fallback = props.fallback, image_url = props.image_url, thumb_url = props.thumb_url;
    var _b = useState(false), modalIsOpen = _b[0], setModalIsOpen = _b[1];
    var _c = useComponentContext('ImageComponent').ModalGallery, ModalGallery = _c === void 0 ? DefaultModalGallery : _c;
    var imageSrc = sanitizeUrl(image_url || thumb_url);
    var toggleModal = function () { return setModalIsOpen(function (modalIsOpen) { return !modalIsOpen; }); };
    return (React.createElement(React.Fragment, null,
        React.createElement("img", __assign({ alt: fallback, className: 'str-chat__message-attachment--img', "data-testid": 'image-test', onClick: toggleModal, src: imageSrc, tabIndex: 0 }, dimensions)),
        React.createElement(Modal, { onClose: toggleModal, open: modalIsOpen },
            React.createElement(ModalGallery, { images: [props], index: 0 }))));
};
