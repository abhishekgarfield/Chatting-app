import React, { useCallback } from 'react';
import { FileIcon } from 'react-file-utils';
import { useMessageInputContext } from '../../context/MessageInputContext';
import { useFileState } from './hooks/useFileState';
import { CloseIcon, DownloadIcon, LoadingIndicatorIcon, RetryIcon } from './icons';
export var AttachmentPreviewList = function () {
    var _a = useMessageInputContext('AttachmentPreviewList'), fileOrder = _a.fileOrder, imageOrder = _a.imageOrder;
    return (React.createElement("div", { className: 'str-chat__attachment-preview-list' },
        React.createElement("div", { className: 'str-chat__attachment-list-scroll-container', "data-testid": 'attachment-list-scroll-container' },
            imageOrder.map(function (id) { return (React.createElement(ImagePreviewItem, { id: id, key: id })); }),
            fileOrder.map(function (id) { return (React.createElement(FilePreviewItem, { id: id, key: id })); }))));
};
var ImagePreviewItem = function (_a) {
    var _b;
    var id = _a.id;
    var _c = useMessageInputContext('ImagePreviewItem'), imageUploads = _c.imageUploads, removeImage = _c.removeImage, uploadImage = _c.uploadImage;
    var handleRemove = useCallback(function (e) {
        e.stopPropagation();
        removeImage(id);
    }, [removeImage, id]);
    var handleRetry = useCallback(function () { return uploadImage(id); }, [uploadImage, id]);
    var image = imageUploads[id];
    var state = useFileState(image);
    // do not display scraped attachments
    if (!image || image.og_scrape_url)
        return null;
    return (React.createElement("div", { className: 'str-chat__attachment-preview-image', "data-testid": 'attachment-preview-image' },
        React.createElement("button", { className: 'str-chat__attachment-preview-delete', "data-testid": 'image-preview-item-delete-button', disabled: state.uploading, onClick: handleRemove },
            React.createElement(CloseIcon, null)),
        state.failed && (React.createElement("button", { className: 'str-chat__attachment-preview-error str-chat__attachment-preview-error-image', "data-testid": 'image-preview-item-retry-button', onClick: handleRetry },
            React.createElement(RetryIcon, null))),
        state.uploading && (React.createElement("div", { className: 'str-chat__attachment-preview-image-loading' },
            React.createElement(LoadingIndicatorIcon, { size: 17 }))),
        (image.previewUri || image.url) && (React.createElement("img", { alt: image.file.name, className: 'str-chat__attachment-preview-thumbnail', src: (_b = image.previewUri) !== null && _b !== void 0 ? _b : image.url }))));
};
var FilePreviewItem = function (_a) {
    var id = _a.id;
    var _b = useMessageInputContext('FilePreviewItem'), fileUploads = _b.fileUploads, removeFile = _b.removeFile, uploadFile = _b.uploadFile;
    var handleRemove = useCallback(function (e) {
        e.stopPropagation();
        removeFile(id);
    }, [removeFile, id]);
    var handleRetry = useCallback(function () { return uploadFile(id); }, [uploadFile, id]);
    var file = fileUploads[id];
    var state = useFileState(file);
    if (!file)
        return null;
    return (React.createElement("div", { className: 'str-chat__attachment-preview-file', "data-testid": 'attachment-preview-file' },
        React.createElement("div", { className: 'str-chat__attachment-preview-file-icon' },
            React.createElement(FileIcon, { filename: file.file.name, mimeType: file.file.type, version: '2' })),
        React.createElement("button", { className: 'str-chat__attachment-preview-delete', "data-testid": 'file-preview-item-delete-button', disabled: state.uploading, onClick: handleRemove },
            React.createElement(CloseIcon, null)),
        state.failed && (React.createElement("button", { className: 'str-chat__attachment-preview-error str-chat__attachment-preview-error-file', "data-testid": 'file-preview-item-retry-button', onClick: handleRetry },
            React.createElement(RetryIcon, null))),
        React.createElement("div", { className: 'str-chat__attachment-preview-file-end' },
            React.createElement("div", { className: 'str-chat__attachment-preview-file-name' }, file.file.name),
            state.finished && (React.createElement("a", { className: 'str-chat__attachment-preview-file-download', download: true, href: file.url, rel: 'noreferrer', target: '_blank' },
                React.createElement(DownloadIcon, null))),
            state.uploading && React.createElement(LoadingIndicatorIcon, { size: 17 }))));
};
