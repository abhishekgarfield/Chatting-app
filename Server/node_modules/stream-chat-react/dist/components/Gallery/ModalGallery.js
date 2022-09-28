import React, { useMemo } from 'react';
import ImageGallery from 'react-image-gallery';
export var ModalGallery = function (props) {
    var images = props.images, index = props.index;
    var formattedArray = useMemo(function () {
        return images.map(function (image) {
            var imageSrc = image.image_url || image.thumb_url || '';
            return {
                original: imageSrc,
                originalAlt: 'User uploaded content',
                source: imageSrc,
            };
        });
    }, [images]);
    return (React.createElement(ImageGallery, { items: formattedArray, showIndex: true, showPlayButton: false, showThumbnails: false, startIndex: index }));
};
