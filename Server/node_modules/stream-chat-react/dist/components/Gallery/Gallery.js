import React, { useState } from 'react';
import clsx from 'clsx';
import { Modal } from '../Modal';
import { ModalGallery as DefaultModalGallery } from './ModalGallery';
import { useComponentContext } from '../../context/ComponentContext';
import { useTranslationContext } from '../../context/TranslationContext';
var UnMemoizedGallery = function (props) {
    var images = props.images;
    var _a = useState(0), index = _a[0], setIndex = _a[1];
    var _b = useState(false), modalOpen = _b[0], setModalOpen = _b[1];
    var _c = useComponentContext('Gallery').ModalGallery, ModalGallery = _c === void 0 ? DefaultModalGallery : _c;
    var t = useTranslationContext('Gallery').t;
    var countImagesDisplayedInPreview = 4;
    var lastImageIndexInPreview = countImagesDisplayedInPreview - 1;
    var toggleModal = function (selectedIndex) {
        if (modalOpen) {
            setModalOpen(false);
        }
        else {
            setIndex(selectedIndex);
            setModalOpen(true);
        }
    };
    var renderImages = images.slice(0, countImagesDisplayedInPreview).map(function (image, i) {
        return i === lastImageIndexInPreview && images.length > countImagesDisplayedInPreview ? (React.createElement("button", { className: 'str-chat__gallery-placeholder', key: "gallery-image-".concat(i), onClick: function () { return toggleModal(i); }, style: {
                backgroundImage: "url(".concat(images[lastImageIndexInPreview].image_url, ")"),
            } },
            React.createElement("p", null, t('{{ imageCount }} more', {
                imageCount: images.length - countImagesDisplayedInPreview,
            })))) : (React.createElement("button", { className: 'str-chat__gallery-image', "data-testid": 'gallery-image', key: "gallery-image-".concat(i), onClick: function () { return toggleModal(i); } },
            React.createElement("img", { alt: 'User uploaded content', src: image.image_url || image.thumb_url })));
    });
    var className = clsx('str-chat__gallery', {
        'str-chat__gallery--square': images.length > lastImageIndexInPreview,
        'str-chat__gallery-two-rows': images.length > 2,
    });
    return (React.createElement("div", { className: className },
        renderImages,
        React.createElement(Modal, { onClose: function () { return setModalOpen(function (modalOpen) { return !modalOpen; }); }, open: modalOpen },
            React.createElement(ModalGallery, { images: images, index: index }))));
};
/**
 * Displays images in a simple responsive grid with a light box to view the images.
 */
export var Gallery = React.memo(UnMemoizedGallery);
